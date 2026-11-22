using Domain.Entities;

namespace Application.Features.Registrations.Shared;

public sealed record RegistrationResponse(
    Guid Id, string RegistrationNumber, DateTime RegistrationDate, string ParticipantName,
    string ContactNumber, string Email, string Address, string CarMakeModel, string PlateNumber,
    RegistrationType RegistrationType, RegistrationStatus Status, decimal RegistrationFee,
    decimal AmountPaid, string PaymentStatus)
{
    public static RegistrationResponse From(Registration x) => new(
        x.Id, x.RegistrationNumber, x.RegistrationDate, x.ParticipantName, x.ContactNumber,
        x.Email, x.Address, x.CarMakeModel, x.PlateNumber, x.RegistrationType, x.Status,
        x.RegistrationFee, x.AmountPaid, x.PaymentStatus);
}
