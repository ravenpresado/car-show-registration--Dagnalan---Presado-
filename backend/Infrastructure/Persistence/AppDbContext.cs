using Application.Abstractions.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<Registration> Registrations => Set<Registration>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var registration = modelBuilder.Entity<Registration>();
        registration.ToTable("Registrations");
        registration.HasKey(x => x.Id);
        registration.Property(x => x.Id).ValueGeneratedNever();
        registration.Property(x => x.RegistrationNumber).HasMaxLength(20).IsRequired();
        registration.HasIndex(x => x.RegistrationNumber).IsUnique();
        registration.Property(x => x.RegistrationDate).IsRequired();
        registration.Property(x => x.ParticipantName).HasMaxLength(150).IsRequired();
        registration.Property(x => x.ContactNumber).HasMaxLength(11).IsRequired();
        registration.Property(x => x.Email).HasMaxLength(200).IsRequired();
        registration.Property(x => x.Address).HasMaxLength(300).IsRequired();
        registration.Property(x => x.CarMakeModel).HasMaxLength(100).IsRequired();
        registration.Property(x => x.PlateNumber).HasMaxLength(15).IsRequired();
        registration.HasIndex(x => x.PlateNumber).IsUnique();
        registration.Property(x => x.RegistrationType).HasConversion<string>().HasMaxLength(20).IsRequired();
        registration.Property(x => x.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        registration.Property(x => x.RegistrationFee).HasPrecision(10, 2).IsRequired();
        registration.Property(x => x.AmountPaid).HasPrecision(10, 2).IsRequired();
        registration.Ignore(x => x.PaymentStatus);
    }
}
