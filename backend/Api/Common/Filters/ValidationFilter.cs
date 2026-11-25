namespace Api.Common.Filters;

using FluentValidation;

/// <summary>
/// Minimal API endpoint filter that validates the incoming request argument using FluentValidation
/// before the endpoint handler is invoked.
/// </summary>
public sealed class ValidationFilter<TRequest> : IEndpointFilter
    where TRequest : class
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var validator = context.HttpContext.RequestServices.GetService<IValidator<TRequest>>();
        if (validator is null)
        {
            return await next(context);
        }

        var request = context.Arguments.OfType<TRequest>().FirstOrDefault();
        if (request is null)
        {
            return TypedResults.Problem(
                title: "Validation.Error",
                detail: "Request payload is missing or invalid.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        var validationResult = await validator.ValidateAsync(request, context.HttpContext.RequestAborted);
        if (!validationResult.IsValid)
        {
            return TypedResults.ValidationProblem(validationResult.ToDictionary());
        }

        return await next(context);
    }
}
