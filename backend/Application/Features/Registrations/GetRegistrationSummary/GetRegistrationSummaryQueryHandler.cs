namespace Application.Features.Registrations.GetRegistrationSummary;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationSummaryQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>>
{
    public async Task<Result<GetRegistrationSummaryResponse>> HandleAsync(
        GetRegistrationSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var snapshots = await dbContext.Registrations
            .AsNoTracking()
            .Select(r => new
            {
                r.Status,
                r.RegistrationFee,
                r.AmountPaid
            })
            .ToListAsync(cancellationToken);

        var totalRegistrations = snapshots.Count;
        var confirmed = snapshots.Count(r => r.Status == RegistrationStatus.Confirmed);
        var checkedIn = snapshots.Count(r => r.Status == RegistrationStatus.CheckedIn);
        var pending = snapshots.Count(r => r.Status == RegistrationStatus.Pending);
        var cancelled = snapshots.Count(r => r.Status == RegistrationStatus.Cancelled);

        // Cancelled registrations are excluded from financial totals
        var active = snapshots.Where(r => r.Status != RegistrationStatus.Cancelled).ToList();
        var totalFees = active.Sum(r => r.RegistrationFee);
        var totalPayments = active.Sum(r => r.AmountPaid);
        var uncollectedPayments = totalFees - totalPayments;

        return Result<GetRegistrationSummaryResponse>.Success(
            new GetRegistrationSummaryResponse(
                totalRegistrations,
                confirmed,
                checkedIn,
                pending,
                cancelled,
                totalFees,
                totalPayments,
                uncollectedPayments));
    }
}
