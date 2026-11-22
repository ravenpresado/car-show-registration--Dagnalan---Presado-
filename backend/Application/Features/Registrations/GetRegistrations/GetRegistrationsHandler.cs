using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.GetRegistrations;

public sealed class GetRegistrationsHandler(IAppDbContext db) : IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>>
{
    public async Task<Result<PagedRegistrationsResponse>> HandleAsync(GetRegistrationsQuery query, CancellationToken cancellationToken = default)
    {
        var itemsQuery = db.Registrations.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var term = query.ParticipantName.Trim().ToLower();
            itemsQuery = itemsQuery.Where(x => x.ParticipantName.ToLower().Contains(term));
        }
        if (query.Type.HasValue) itemsQuery = itemsQuery.Where(x => x.RegistrationType == query.Type.Value);
        if (query.Status.HasValue) itemsQuery = itemsQuery.Where(x => x.Status == query.Status.Value);
        var total = await itemsQuery.CountAsync(cancellationToken);
        var entities = await itemsQuery.OrderByDescending(x => x.RegistrationDate).ThenByDescending(x => x.RegistrationNumber)
            .Skip((query.Page - 1) * query.PageSize).Take(query.PageSize).ToListAsync(cancellationToken);
        var response = new PagedRegistrationsResponse(entities.Select(RegistrationResponse.From).ToList(), query.Page,
            query.PageSize, total, total == 0 ? 0 : (int)Math.Ceiling(total / (double)query.PageSize));
        return Result<PagedRegistrationsResponse>.Success(response);
    }
}
