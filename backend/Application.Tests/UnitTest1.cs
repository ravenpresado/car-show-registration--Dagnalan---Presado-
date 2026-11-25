using Application.Features.Registrations.CreateRegistration;
using Domain.Entities;

namespace Application.Tests;

public class CreateRegistrationValidatorTests
{
    private readonly CreateRegistrationValidator _validator = new();

    private static CreateRegistrationCommand ValidCommand() =>
        new(
            "Juan Dela Cruz",
            "09171234567",
            "juan@example.com",
            "Manila, Philippines",
            "Toyota Vios",
            "ABC1234",
            RegistrationType.Competitor,
            1000m
        );

    [Fact]
    public void Validate_ValidRegistration_ReturnsSuccess()
    {
        var result = _validator.Validate(ValidCommand());

        Assert.True(result.IsValid);
    }

    [Fact]
    public void Validate_InvalidContactNumber_ReturnsFailure()
    {
        var command = ValidCommand() with { ContactNumber = "12345" };

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
    }

    [Fact]
    public void Validate_EmptyParticipantName_ReturnsFailure()
    {
        var command = ValidCommand() with { ParticipantName = "" };

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
    }

    [Fact]
    public void Validate_InvalidEmail_ReturnsFailure()
    {
        var command = ValidCommand() with { Email = "invalid-email" };

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
    }

    [Fact]
    public void Validate_NegativeAmountPaid_ReturnsFailure()
    {
        var command = ValidCommand() with { AmountPaid = -100m };

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
    }

    [Fact]
    public void Validate_AmountPaidAboveRegistrationFee_ReturnsFailure()
    {
        var command = ValidCommand() with { AmountPaid = 3000m };

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
    }
}