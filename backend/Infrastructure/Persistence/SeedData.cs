using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext db, CancellationToken cancellationToken = default)
    {
        if (await db.Registrations.AnyAsync(cancellationToken)) return;
        var names = new[] { "Juan Dela Cruz", "Maria Santos", "Pedro Reyes", "Ana Garcia", "Mark Bautista", "Carlo Mendoza", "Sofia Ramos", "Miguel Torres", "Liza Cruz", "Jose Flores", "Paolo Rivera", "Ella Navarro", "Rafael Lim", "Bea Castillo", "Nico Aquino", "Mia Fernandez", "Gabriel Tan", "Chloe Diaz", "Andrei Gomez", "Faith Lopez", "Enzo Villanueva", "Kyla Romero", "Luis Mercado", "Aira Dominguez", "Noah Perez" };
        var models = new[] { "Toyota Supra MK4", "Honda Civic Type R", "Nissan Skyline R34", "Mazda RX-7", "Mitsubishi Lancer Evo IX" };
        var types = new[] { RegistrationType.Exhibitor, RegistrationType.Competitor, RegistrationType.VIP };
        var statuses = new[] { RegistrationStatus.Pending, RegistrationStatus.Confirmed, RegistrationStatus.CheckedIn, RegistrationStatus.Cancelled };
        var list = new List<Registration>();
        for (var i = 0; i < 25; i++)
        {
            var type = types[i % types.Length];
            var fee = Registration.FeeFor(type);
            var paid = i % 3 == 0 ? 0m : i % 3 == 1 ? fee / 2m : fee;
            list.Add(new Registration
            {
                Id = Guid.Parse($"00000000-0000-0000-0000-{i + 1:000000000000}"),
                RegistrationNumber = $"CS27-{i + 1:0000}", RegistrationDate = DateTime.UtcNow.AddDays(-i),
                ParticipantName = names[i], ContactNumber = $"0917{i + 1000000:0000000}",
                Email = $"participant{i + 1}@example.com", Address = $"{i + 1} Rizal Street, Sorsogon City",
                CarMakeModel = models[i % models.Length], PlateNumber = $"CAR {i + 1:0000}",
                RegistrationType = type, Status = statuses[i % statuses.Length], RegistrationFee = fee, AmountPaid = paid
            });
        }
        db.Registrations.AddRange(list);
        await db.SaveChangesAsync(cancellationToken);
    }
}
