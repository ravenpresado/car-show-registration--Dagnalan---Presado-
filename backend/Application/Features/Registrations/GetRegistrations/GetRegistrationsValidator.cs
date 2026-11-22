using FluentValidation;

namespace Application.Features.Registrations.GetRegistrations;

public sealed class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.ParticipantName).MaximumLength(150).When(x => x.ParticipantName is not null);
        RuleFor(x => x.Type).Must(x => !x.HasValue || Enum.IsDefined(x.Value));
        RuleFor(x => x.Status).Must(x => !x.HasValue || Enum.IsDefined(x.Value));
        RuleFor(x => x.Page).GreaterThanOrEqualTo(1);
        RuleFor(x => x.PageSize).InclusiveBetween(1, 50);
    }
}
