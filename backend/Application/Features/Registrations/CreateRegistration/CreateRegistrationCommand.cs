using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;
using Domain.Entities;

namespace Application.Features.Registrations.CreateRegistration;

public sealed record CreateRegistrationCommand(
    string ParticipantName, string ContactNumber, string Email, string Address,
    string CarMakeModel, string PlateNumber, RegistrationType RegistrationType, decimal AmountPaid
) : ICommand<Domain.Common.Result<RegistrationResponse>>;
