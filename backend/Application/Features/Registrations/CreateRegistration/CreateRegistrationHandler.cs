using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationHandler(IAppDbContext db) : ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> HandleAsync(CreateRegistrationCommand command, CancellationToken cancellationToken = default)
    {
        var plate = command.PlateNumber.Trim().ToUpperInvariant();
        if (await db.Registrations.AnyAsync(x => x.PlateNumber == plate, cancellationToken))
            return Result<RegistrationResponse>.Failure(new Error("Registration.Conflict", $"A registration already exists for plate number '{plate}'."));

        var lastNumber = await db.Registrations.AsNoTracking().Select(x => x.RegistrationNumber)
            .OrderByDescending(x => x).FirstOrDefaultAsync(cancellationToken);
        var next = 1;
        if (!string.IsNullOrWhiteSpace(lastNumber) && int.TryParse(lastNumber.AsSpan(5), out var parsed)) next = parsed + 1;
        var entity = new Registration
        {
            Id = Guid.NewGuid(), RegistrationNumber = $"CS27-{next:0000}", RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(), ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(), Address = command.Address.Trim(), CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = plate, RegistrationType = command.RegistrationType, Status = RegistrationStatus.Pending,
            RegistrationFee = Registration.FeeFor(command.RegistrationType), AmountPaid = command.AmountPaid
        };
        db.Registrations.Add(entity);
        try { await db.SaveChangesAsync(cancellationToken); }
        catch (DbUpdateException) { return Result<RegistrationResponse>.Failure(new Error("Registration.Conflict", $"A registration already exists for plate number '{plate}'.")); }
        return Result<RegistrationResponse>.Success(RegistrationResponse.From(entity));
    }
}
