
using FluentValidation;
using Domain.Entities;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty()
            .MaximumLength(150)
            .WithName("Participant Name");

        RuleFor(x => x.ContactNumber)
            .NotEmpty()
            .Matches(@"^09\d{9}$")
            .WithMessage("Contact Number must use PH mobile format 09XXXXXXXXX (11 digits).");

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
            .IsInEnum();

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0)
            .Must((command, paid) =>
                Enum.IsDefined(command.RegistrationType) &&
                paid <= Registration.FeeFor(command.RegistrationType))
            .WithMessage("Amount Paid must be between 0 and the registration fee for the selected type.");
    }
}
