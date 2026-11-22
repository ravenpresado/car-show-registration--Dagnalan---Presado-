using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Api.Common.Filters;

public sealed class ValidationFilter<TRequest>(IValidator<TRequest> validator) : IEndpointFilter where TRequest : notnull
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.Arguments.OfType<TRequest>().FirstOrDefault();
        if (request is null) return await next(context);
        var validation = await validator.ValidateAsync(request, context.HttpContext.RequestAborted);
        if (validation.IsValid) return await next(context);
        var errors = validation.Errors.GroupBy(x => x.PropertyName)
            .ToDictionary(x => x.Key, x => x.Select(e => e.ErrorMessage).Distinct().ToArray());
        return Results.ValidationProblem(errors, title: "Validation failed", statusCode: StatusCodes.Status400BadRequest);
    }
}
