namespace Domain.Entities;

using Domain.Common;
using Domain.Enums;

/// <summary>
/// Represents a single participant entering one car in Car Show 2027.
/// </summary>
public sealed class Registration : BaseEntity
{
    public string RegistrationNumber { get; set; } = default!;

    public DateTime RegistrationDate { get; set; }

    public string ParticipantName { get; set; } = default!;

    public string ContactNumber { get; set; } = default!;

    public string Email { get; set; } = default!;

    public string Address { get; set; } = default!;

    public string CarMakeModel { get; set; } = default!;

    public string PlateNumber { get; set; } = default!;

    public RegistrationType RegistrationType { get; set; }

    public RegistrationStatus Status { get; set; } = RegistrationStatus.Pending;

    public decimal RegistrationFee { get; set; }

    public decimal AmountPaid { get; set; }

    /// <summary>
    /// Computed payment state derived from <see cref="AmountPaid"/> and <see cref="RegistrationFee"/>.
    /// Not persisted to the database.
    /// </summary>
    public string PaymentStatus => AmountPaid switch
    {
        <= 0m => "Unpaid",
        var paid when paid < RegistrationFee => "Partial",
        _ => "Paid"
    };

    /// <summary>
    /// Returns the authoritative server-side fee for the specified registration type.
    /// </summary>
    public static decimal GetFeeForType(RegistrationType type) => type switch
    {
        RegistrationType.Exhibitor => 1500.00m,
        RegistrationType.Competitor => 2500.00m,
        RegistrationType.VIP => 5000.00m,
        _ => throw new ArgumentOutOfRangeException(nameof(type), type, "Unsupported registration type.")
    };
}
