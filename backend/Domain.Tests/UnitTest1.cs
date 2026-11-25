
using Domain.Entities;

namespace Domain.Tests;

public class RegistrationTests
{
    [Fact]
    public void FeeFor_Exhibitor_Returns1500()
    {
        Assert.Equal(1500m, Registration.FeeFor(RegistrationType.Exhibitor));
    }

    [Fact]
    public void FeeFor_Competitor_Returns2500()
    {
        Assert.Equal(2500m, Registration.FeeFor(RegistrationType.Competitor));
    }

    [Fact]
    public void FeeFor_VIP_Returns5000()
    {
        Assert.Equal(5000m, Registration.FeeFor(RegistrationType.VIP));
    }

    [Fact]
    public void PaymentStatus_ZeroPayment_ReturnsUnpaid()
    {
        var registration = new Registration
        {
            RegistrationFee = 2500m,
            AmountPaid = 0m
        };

        Assert.Equal("Unpaid", registration.PaymentStatus);
    }

    [Fact]
    public void PaymentStatus_PartialPayment_ReturnsPartial()
    {
        var registration = new Registration
        {
            RegistrationFee = 2500m,
            AmountPaid = 1000m
        };

        Assert.Equal("Partial", registration.PaymentStatus);
    }

    [Fact]
    public void PaymentStatus_FullPayment_ReturnsPaid()
    {
        var registration = new Registration
        {
            RegistrationFee = 2500m,
            AmountPaid = 2500m
        };

        Assert.Equal("Paid", registration.PaymentStatus);
    }
}
