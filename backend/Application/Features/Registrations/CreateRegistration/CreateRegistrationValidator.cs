namespace Application.Features.Registrations.CreateRegistration;

using Domain.Entities;
using FluentValidation;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.ContactNumber)
            .NotEmpty()
            .Matches(@"^09\d{9}$")
            .WithMessage("Contact number must be an 11-digit Philippine mobile number in 09XXXXXXXXX format.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.CarMakeModel)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.PlateNumber)
            .NotEmpty()
            .MaximumLength(15);

        RuleFor(x => x.RegistrationType)
            .IsInEnum()
            .WithMessage("Registration type must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0m)
            .WithMessage("Amount paid must be 0 or more.");

        RuleFor(x => x.AmountPaid)
            .Must((command, amountPaid) => amountPaid <= Registration.GetFeeForType(command.RegistrationType))
            .When(command => Enum.IsDefined(command.RegistrationType))
            .WithMessage(command =>
                $"Amount paid cannot be more than the fee ({Registration.GetFeeForType(command.RegistrationType):N0}) for {command.RegistrationType}.");
    }
}
