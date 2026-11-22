using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.GetRegistrationSummary;

public sealed class GetRegistrationSummaryHandler(IAppDbContext db) : IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>
{
    public async Task<Result<RegistrationSummaryResponse>> HandleAsync(GetRegistrationSummaryQuery query, CancellationToken cancellationToken = default)
    {
        var all = db.Registrations.AsNoTracking();
        // SQLite does not support every decimal aggregate translation; materialize only the two money columns.
        var moneyRows = await all.Where(x => x.Status != RegistrationStatus.Cancelled)
            .Select(x => new { x.RegistrationFee, x.AmountPaid }).ToListAsync(cancellationToken);
        var fees = moneyRows.Sum(x => x.RegistrationFee);
        var payments = moneyRows.Sum(x => x.AmountPaid);
        var response = new RegistrationSummaryResponse(
            await all.CountAsync(cancellationToken),
            await all.CountAsync(x => x.Status == RegistrationStatus.Confirmed, cancellationToken),
            await all.CountAsync(x => x.Status == RegistrationStatus.CheckedIn, cancellationToken),
            await all.CountAsync(x => x.Status == RegistrationStatus.Pending, cancellationToken),
            await all.CountAsync(x => x.Status == RegistrationStatus.Cancelled, cancellationToken),
            fees, payments, fees - payments);
        return Result<RegistrationSummaryResponse>.Success(response);
    }
}
