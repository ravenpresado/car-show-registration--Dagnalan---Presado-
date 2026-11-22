using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;

namespace Application.Features.Registrations.GetRegistrationById;

public sealed record GetRegistrationByIdQuery(Guid Id) : IQuery<Domain.Common.Result<RegistrationResponse>>;
