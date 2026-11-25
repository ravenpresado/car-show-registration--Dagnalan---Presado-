namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var trimmedPlate = command.PlateNumber.Trim();
        var normalizedPlate = trimmedPlate.ToLowerInvariant();

        var plateExists = await dbContext.Registrations
            .AsNoTracking()
            .AnyAsync(r => r.PlateNumber.ToLower() == normalizedPlate, cancellationToken);

        if (plateExists)
        {
            return Result<RegistrationResponse>.Failure(
                Error.Conflict(
                    "Registration.Conflict",
                    $"A registration with plate number '{trimmedPlate}' already exists."));
        }

        var nextRegistrationNumber = await GenerateNextRegistrationNumberAsync(cancellationToken);
        var fee = Registration.GetFeeForType(command.RegistrationType);

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = nextRegistrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = trimmedPlate,
            RegistrationType = command.RegistrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        dbContext.Registrations.Add(registration);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Result<RegistrationResponse>.Success(RegistrationResponse.FromEntity(registration));
    }

    private async Task<string> GenerateNextRegistrationNumberAsync(CancellationToken cancellationToken)
    {
        var existingNumbers = await dbContext.Registrations
            .AsNoTracking()
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        var maxSequence = existingNumbers
            .Select(number => number.StartsWith("CS27-", StringComparison.OrdinalIgnoreCase)
                && int.TryParse(number.AsSpan(5), out var sequence)
                    ? sequence
                    : 0)
            .DefaultIfEmpty(0)
            .Max();

        return $"CS27-{maxSequence + 1:D4}";
    }
}
