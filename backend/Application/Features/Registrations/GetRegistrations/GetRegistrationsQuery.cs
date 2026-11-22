using Application.Abstractions.Messaging;
using Application.Features.Registrations.Shared;
using Domain.Entities;

namespace Application.Features.Registrations.GetRegistrations;

public sealed record GetRegistrationsQuery(string? ParticipantName, RegistrationType? Type, RegistrationStatus? Status, int Page = 1, int PageSize = 10)
    : IQuery<Domain.Common.Result<PagedRegistrationsResponse>>;
public sealed record PagedRegistrationsResponse(IReadOnlyList<RegistrationResponse> Items, int Page, int PageSize, int TotalCount, int TotalPages);
