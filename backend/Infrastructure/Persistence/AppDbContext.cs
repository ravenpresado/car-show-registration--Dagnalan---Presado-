namespace Infrastructure.Persistence;

using Application.Abstractions.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

public sealed class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Registration> Registrations => Set<Registration>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var utcDateTimeConverter = new ValueConverter<DateTime, DateTime>(
            value => value.Kind == DateTimeKind.Utc ? value : value.ToUniversalTime(),
            value => DateTime.SpecifyKind(value, DateTimeKind.Utc));

        modelBuilder.Entity<Registration>(entity =>
        {
            entity.ToTable("Registrations");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.RegistrationNumber)
                .IsRequired()
                .HasMaxLength(20);

            entity.HasIndex(e => e.RegistrationNumber)
                .IsUnique();

            entity.Property(e => e.RegistrationDate)
                .IsRequired()
                .HasConversion(utcDateTimeConverter);

            entity.Property(e => e.ParticipantName)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(e => e.ContactNumber)
                .IsRequired()
                .HasMaxLength(11);

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(300);

            entity.Property(e => e.CarMakeModel)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.PlateNumber)
                .IsRequired()
                .HasMaxLength(15)
                .UseCollation("NOCASE");

            entity.HasIndex(e => e.PlateNumber)
                .IsUnique();

            entity.Property(e => e.RegistrationType)
                .HasConversion<string>()
                .IsRequired()
                .HasMaxLength(20);

            entity.Property(e => e.Status)
                .HasConversion<string>()
                .IsRequired()
                .HasMaxLength(20);

            entity.Property(e => e.RegistrationFee)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            entity.Property(e => e.AmountPaid)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            entity.Ignore(e => e.PaymentStatus);
        });
    }
}
