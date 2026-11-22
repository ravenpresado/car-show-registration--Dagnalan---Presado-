using System.Text.Json.Serialization;
using Api.Features.Registrations;
using Application.Abstractions.Data;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("CarShow") ?? "Data Source=carshow.db";
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
builder.Services.AddScoped<IAppDbContext>(sp => sp.GetRequiredService<AppDbContext>());
builder.Services.AddValidatorsFromAssemblyContaining<CreateRegistrationValidator>();
builder.Services.AddScoped<CreateRegistrationHandler>();
builder.Services.AddScoped<GetRegistrationsHandler>();
builder.Services.AddScoped<GetRegistrationByIdHandler>();
builder.Services.AddScoped<GetRegistrationSummaryHandler>();
builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy => policy
    .WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddOpenApi(options => options.AddDocumentTransformer((document, _, _) =>
{
    document.Info.Title = "Car Show Registration System API";
    document.Info.Description = "AutoVista Events — Car Show 2027 registration API.";
    document.Info.Version = "v1";
    return Task.CompletedTask;
}));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
    await SeedData.SeedAsync(db);
}

app.UseCors("Frontend");
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.MapGet("/", () => Results.Ok(new { message = "Car Show Registration API is running.", documentation = "/scalar/v1" }));
app.MapRegistrationEndpoints();
app.Run();

public partial class Program { }
