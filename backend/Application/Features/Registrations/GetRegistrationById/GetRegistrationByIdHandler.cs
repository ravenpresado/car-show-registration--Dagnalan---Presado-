using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.GetRegistrationById;

public sealed class GetRegistrationByIdHandler(IAppDbContext db) : IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> HandleAsync(GetRegistrationByIdQuery query, CancellationToken cancellationToken = default)
    {
        var entity = await db.Registrations.AsNoTracking().FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);
        return entity is null
            ? Result<RegistrationResponse>.Failure(Error.NotFound("Registration.NotFound", $"Registration with ID '{query.Id}' was not found."))
            : Result<RegistrationResponse>.Success(RegistrationResponse.From(entity));
    }
}
