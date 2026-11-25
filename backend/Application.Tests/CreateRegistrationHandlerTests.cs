
using Application.Abstractions.Data;
using Application.Features.Registrations.CreateRegistration;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Tests;

public class CreateRegistrationHandlerTests
{
    private static TestDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new TestDbContext(options);
    }

    private sealed class TestDbContext(DbContextOptions<TestDbContext> options)
        : DbContext(options), IAppDbContext
    {
        public DbSet<Registration> Registrations => Set<Registration>();
    }

    private static CreateRegistrationCommand ValidCommand(string plateNumber = "ABC1234") =>
        new(
            "Juan Dela Cruz",
            "09171234567",
            "juan@example.com",
            "Manila, Philippines",
            "Toyota Vios",
            plateNumber,
            RegistrationType.Competitor,
            1000m
        );

    [Fact]
    public async Task Handle_ValidRegistration_CreatesRegistration()
    {
        using var db = CreateDbContext();
        var handler = new CreateRegistrationHandler(db);

        var result = await handler.HandleAsync(ValidCommand());

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("CS27-0001", result.Value.RegistrationNumber);
        Assert.Equal("ABC1234", result.Value.PlateNumber);
        Assert.Equal(1, await db.Registrations.CountAsync());
    }

    [Fact]
    public async Task Handle_DuplicatePlateNumber_ReturnsConflict()
    {
        using var db = CreateDbContext();
        var handler = new CreateRegistrationHandler(db);

        await handler.HandleAsync(ValidCommand());
        var result = await handler.HandleAsync(ValidCommand());

        Assert.False(result.IsSuccess);
        Assert.Equal("Registration.Conflict", result.Error?.Code);
        Assert.Equal(1, await db.Registrations.CountAsync());
    }

    [Fact]
    public async Task Handle_PlateNumberWithSpacesAndLowercase_NormalizesPlateNumber()
    {
        using var db = CreateDbContext();
        var handler = new CreateRegistrationHandler(db);

        var result = await handler.HandleAsync(ValidCommand(" abc1234 "));

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("ABC1234", result.Value.PlateNumber);
    }
}
