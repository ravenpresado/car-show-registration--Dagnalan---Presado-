using Api.Common.Filters;
using Api.Common.Extensions;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Entities;
using FluentValidation;

namespace Api.Features.Registrations;

public static class RegistrationEndpoints
{
    public static RouteGroupBuilder MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations").WithTags("Registrations");
        group.MapPost("", async (CreateRegistrationCommand command, CreateRegistrationHandler handler, CancellationToken ct) =>
        {
            var result = await handler.HandleAsync(command, ct);
            if (!result.IsSuccess) return result.ToProblemDetails();
            var item = result.Value!;
            return Results.Created($"/api/registrations/{item.Id}", item);
        }).AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>().WithName("CreateRegistration");

        group.MapGet("", async ([AsParameters] GetRegistrationsQuery query, GetRegistrationsHandler handler, CancellationToken ct) =>
        {
            var result = await handler.HandleAsync(query, ct);
            return result.IsSuccess ? Results.Ok(result.Value) : result.ToProblemDetails();
        }).AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>().WithName("GetRegistrations");

        group.MapGet("/{id:guid}", async (Guid id, GetRegistrationByIdHandler handler, CancellationToken ct) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationByIdQuery(id), ct);
            return result.IsSuccess ? Results.Ok(result.Value) : result.ToProblemDetails();
        }).WithName("GetRegistrationById");

        group.MapGet("/summary", async (GetRegistrationSummaryHandler handler, CancellationToken ct) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationSummaryQuery(), ct);
            return result.IsSuccess ? Results.Ok(result.Value) : result.ToProblemDetails();
        }).WithName("GetRegistrationSummary");
        return group;
    }

}
