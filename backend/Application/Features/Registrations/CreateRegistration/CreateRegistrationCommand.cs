namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;

/// <summary>
/// Command to create a new Car Show 2027 registration. Server-controlled fields
/// (registration number, date, fee, and status) are excluded from the input contract.
/// </summary>
public sealed record CreateRegistrationCommand(
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    decimal AmountPaid) : ICommand<Result<RegistrationResponse>>;
