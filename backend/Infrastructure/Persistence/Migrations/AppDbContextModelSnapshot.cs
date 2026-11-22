using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace Infrastructure.Persistence.Migrations;

[DbContext(typeof(AppDbContext))]
public sealed class AppDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
        modelBuilder.HasAnnotation("ProductVersion", "10.0.0");
        modelBuilder.Entity<Registration>(entity =>
        {
            entity.ToTable("Registrations");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).ValueGeneratedNever();
            entity.Property(x => x.RegistrationNumber).HasMaxLength(20).IsRequired();
            entity.HasIndex(x => x.RegistrationNumber).IsUnique();
            entity.Property(x => x.RegistrationDate).IsRequired();
            entity.Property(x => x.ParticipantName).HasMaxLength(150).IsRequired();
            entity.Property(x => x.ContactNumber).HasMaxLength(11).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Address).HasMaxLength(300).IsRequired();
            entity.Property(x => x.CarMakeModel).HasMaxLength(100).IsRequired();
            entity.Property(x => x.PlateNumber).HasMaxLength(15).IsRequired();
            entity.HasIndex(x => x.PlateNumber).IsUnique();
            entity.Property(x => x.RegistrationType).HasConversion<string>().HasMaxLength(20).IsRequired();
            entity.Property(x => x.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
            entity.Property(x => x.RegistrationFee).HasPrecision(10, 2).IsRequired();
            entity.Property(x => x.AmountPaid).HasPrecision(10, 2).IsRequired();
            entity.Ignore(x => x.PaymentStatus);
        });
    }
}
