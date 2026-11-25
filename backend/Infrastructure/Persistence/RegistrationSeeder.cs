namespace Infrastructure.Persistence;

using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public static class RegistrationSeeder
{
    public static async Task SeedAsync(AppDbContext dbContext, CancellationToken cancellationToken = default)
    {
        if (await dbContext.Registrations.AnyAsync(cancellationToken))
        {
            return;
        }

        var baseDate = new DateTime(2026, 11, 1, 8, 0, 0, DateTimeKind.Utc);

        var seedInputs = new (
            string Name,
            string Contact,
            string Email,
            string Address,
            string Car,
            string Plate,
            RegistrationType Type,
            RegistrationStatus Status,
            decimal AmountPaid)[]
        {
            ("Marco Villanueva", "09171234501", "marco.villanueva@example.com", "12 Rizal St., Sorsogon City", "Toyota Supra MK4", "SOR 1001", RegistrationType.VIP, RegistrationStatus.Confirmed, 5000.00m),
            ("Clarisse Mendoza", "09181234502", "clarisse.mendoza@example.com", "45 Magsaysay Ave., Naga City", "Honda Civic Type R FK8", "CAM 1002", RegistrationType.Competitor, RegistrationStatus.CheckedIn, 2500.00m),
            ("Rafael Bautista", "09191234503", "rafael.bautista@example.com", "88 Burgos St., Legazpi City", "Nissan Skyline GT-R R34", "ALB 1003", RegistrationType.VIP, RegistrationStatus.CheckedIn, 5000.00m),
            ("Katrina Santos", "09201234504", "katrina.santos@example.com", "19 Quezon Blvd., Sorsogon City", "Mazda RX-7 FD3S", "SOR 1004", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 1500.00m),
            ("Miguel Fernandez", "09211234505", "miguel.fernandez@example.com", "73 Mabini St., Iriga City", "Subaru WRX STI", "CAM 1005", RegistrationType.Competitor, RegistrationStatus.Pending, 1000.00m),
            ("Andrea Navarro", "09221234506", "andrea.navarro@example.com", "204 Bonifacio St., Tabaco City", "Mitsubishi Lancer Evo IX", "ALB 1006", RegistrationType.Competitor, RegistrationStatus.Confirmed, 2500.00m),
            ("Paolo Ramos", "09231234507", "paolo.ramos@example.com", "56 Penafrancia Ave., Naga City", "Toyota GR86", "CAM 1007", RegistrationType.Exhibitor, RegistrationStatus.CheckedIn, 1500.00m),
            ("Bianca Aquino", "09241234508", "bianca.aquino@example.com", "91 Luna St., Sorsogon City", "Nissan 350Z", "SOR 1008", RegistrationType.VIP, RegistrationStatus.Pending, 2500.00m),
            ("Lorenzo Castillo", "09251234509", "lorenzo.castillo@example.com", "34 Del Rosario, Daraga, Albay", "Honda S2000", "ALB 1009", RegistrationType.Competitor, RegistrationStatus.Cancelled, 0.00m),
            ("Patricia Torres", "09261234510", "patricia.torres@example.com", "18 Zamora St., Gubat, Sorsogon", "Mazda MX-5 Miata ND", "SOR 1010", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 750.00m),
            ("Gabriel Mercado", "09271234511", "gabriel.mercado@example.com", "62 Roxas Ave., Legazpi City", "Ford Mustang GT", "ALB 1011", RegistrationType.VIP, RegistrationStatus.Confirmed, 5000.00m),
            ("Stephanie Reyes", "09281234512", "stephanie.reyes@example.com", "110 Osmena St., Daet, CamNorte", "Honda Civic EG6", "CNM 1012", RegistrationType.Exhibitor, RegistrationStatus.Pending, 0.00m),
            ("Dominic Salazar", "09291234513", "dominic.salazar@example.com", "77 Taft St., Bulan, Sorsogon", "Toyota AE86 Trueno", "SOR 1013", RegistrationType.Competitor, RegistrationStatus.CheckedIn, 2500.00m),
            ("Nicole Soriano", "09391234514", "nicole.soriano@example.com", "144 Panganiban Dr., Naga City", "BMW M3 E46", "CAM 1014", RegistrationType.VIP, RegistrationStatus.Confirmed, 3000.00m),
            ("Christian Pineda", "09451234515", "christian.pineda@example.com", "28 San Juan, Irosin, Sorsogon", "Nissan Silvia S15", "SOR 1015", RegistrationType.Competitor, RegistrationStatus.Confirmed, 1500.00m),
            ("Vanessa Lim", "09561234516", "vanessa.lim@example.com", "99 Albay District, Legazpi City", "Porsche 911 Carrera", "ALB 1016", RegistrationType.VIP, RegistrationStatus.CheckedIn, 5000.00m),
            ("Jericho Ocampo", "09661234517", "jericho.ocampo@example.com", "15 Aguinaldo St., Ligao City", "Toyota Corolla Levin", "ALB 1017", RegistrationType.Exhibitor, RegistrationStatus.Cancelled, 500.00m),
            ("Camille De Leon", "09771234518", "camille.deleon@example.com", "53 Rizal St., Masbate City", "Suzuki Swift Sport", "MAS 1018", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 1500.00m),
            ("Kenneth Dizon", "09951234519", "kenneth.dizon@example.com", "401 Diversion Rd., Naga City", "Mitsubishi Eclipse GSX", "CAM 1019", RegistrationType.Competitor, RegistrationStatus.Pending, 0.00m),
            ("Danica Flores", "09981234520", "danica.flores@example.com", "82 Quirino Hwy., Sorsogon City", "Volkswagen Golf GTI", "SOR 1020", RegistrationType.Exhibitor, RegistrationStatus.CheckedIn, 1500.00m),
            ("Adrian Evangelista", "09171234521", "adrian.evangelista@example.com", "210 Washington Dr., Legazpi City", "Chevrolet Camaro SS", "ALB 1021", RegistrationType.VIP, RegistrationStatus.Cancelled, 2000.00m),
            ("Samantha Cruz", "09181234522", "samantha.cruz@example.com", "67 Maharlika Hwy., Pilar, Sorsogon", "Honda Integra Type R", "SOR 1022", RegistrationType.Competitor, RegistrationStatus.Confirmed, 2500.00m),
            ("Joshua Manalo", "09191234523", "joshua.manalo@example.com", "132 Barlin St., Naga City", "Toyota MR2 SW20", "CAM 1023", RegistrationType.Exhibitor, RegistrationStatus.Pending, 500.00m),
            ("Trisha Pangilinan", "09201234524", "trisha.pangilinan@example.com", "505 Rizal St., Daraga, Albay", "Nissan 370Z Nismo", "ALB 1024", RegistrationType.Competitor, RegistrationStatus.Confirmed, 2000.00m),
            ("Vincent Rosario", "09211234525", "vincent.rosario@example.com", "29 Piot, Sorsogon City", "Lexus LC 500", "SOR 1025", RegistrationType.Exhibitor, RegistrationStatus.Pending, 0.00m)
        };

        var registrations = seedInputs.Select((item, index) => new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = $"CS27-{index + 1:D4}",
            RegistrationDate = baseDate.AddHours(index * 6),
            ParticipantName = item.Name,
            ContactNumber = item.Contact,
            Email = item.Email,
            Address = item.Address,
            CarMakeModel = item.Car,
            PlateNumber = item.Plate,
            RegistrationType = item.Type,
            Status = item.Status,
            RegistrationFee = Registration.GetFeeForType(item.Type),
            AmountPaid = item.AmountPaid
        });

        await dbContext.Registrations.AddRangeAsync(registrations, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
