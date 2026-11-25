namespace Application.Features.Registrations;

using Domain.Entities;
using Domain.Enums;

/// <summary>
/// Shared registration DTO matching the frontend JSON contract.
/// </summary>
public sealed record RegistrationResponse(
    Guid Id,
    string RegistrationNumber,
    DateTime RegistrationDate,
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    RegistrationStatus Status,
    decimal RegistrationFee,
    decimal AmountPaid,
    string PaymentStatus)
{
    public static RegistrationResponse FromEntity(Registration entity) => new(
        entity.Id,
        entity.RegistrationNumber,
        entity.RegistrationDate,
        entity.ParticipantName,
        entity.ContactNumber,
        entity.Email,
        entity.Address,
        entity.CarMakeModel,
        entity.PlateNumber,
        entity.RegistrationType,
        entity.Status,
        entity.RegistrationFee,
        entity.AmountPaid,
        entity.PaymentStatus);
}
