using Application.Abstractions.Messaging;

namespace Application.Features.Registrations.GetRegistrationSummary;

public sealed record GetRegistrationSummaryQuery() : IQuery<Domain.Common.Result<RegistrationSummaryResponse>>;
public sealed record RegistrationSummaryResponse(int TotalRegistrations, int Confirmed, int CheckedIn, int Pending, int Cancelled,
    decimal TotalFees, decimal TotalPayments, decimal UncollectedPayments);
