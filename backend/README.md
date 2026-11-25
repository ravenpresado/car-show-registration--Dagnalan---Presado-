# Car Show 2027 Registration System — Backend API

ASP.NET Core (.NET 10) Minimal API built with **Vertical Slice Architecture**, **EF Core + SQLite**, **FluentValidation**, and **Scalar OpenAPI**.

## Architecture

- **Domain**: `Registration` entity, `RegistrationType` (`Exhibitor`, `Competitor`, `VIP`), `RegistrationStatus` (`Pending`, `Confirmed`, `CheckedIn`, `Cancelled`), `BaseEntity`, and `Result<T>` / `Error`.
- **Application**: Vertical slices under `Application/Features/Registrations/`:
  - `CreateRegistration` (Command + Handler + Validator)
  - `GetRegistrations` (Query + Handler + Validator)
  - `GetRegistrationById` (Query + Handler)
  - `GetRegistrationSummary` (Query + Handler)
- **Infrastructure**: `AppDbContext` with SQLite (`Data Source=carshow.db`), `InitialCreate` EF Core migration, unique indexes on `RegistrationNumber` and case-insensitive `PlateNumber` (`NOCASE`), and idempotent `RegistrationSeeder` (25 sample records).
- **Api**: Minimal API route group `/api/registrations`, `ValidationFilter<T>`, `ResultExtensions` (`ProblemDetails` for 400 / 404 / 409), string enum JSON serialization, CORS for `http://localhost:5173`, and Scalar UI at `/scalar/v1`.

## Business Rules

- **Server-Side Fees**: `Exhibitor` = ₱1,500.00, `Competitor` = ₱2,500.00, `VIP` = ₱5,000.00.
- **Server-Controlled Fields**: `RegistrationNumber` (`CS27-XXXX`), `RegistrationDate` (UTC), `Status` (`Pending`), and `RegistrationFee` are generated on the server.
- **Unique Plate Rule**: Duplicate `PlateNumber` (case-insensitive) returns `409 Conflict` (`Registration.Conflict`).
- **Payment Status**: Computed (`Unpaid`, `Partial`, `Paid`) from `AmountPaid` and `RegistrationFee`.
- **Cancelled Rule**: `Cancelled` registrations are counted in `cancelled` and `totalRegistrations`, and excluded from `totalFees`, `totalPayments`, and `uncollectedPayments`.

## Running the Backend

From the `backend/` folder:

```powershell
dotnet restore VerticalSlice.slnx
dotnet build VerticalSlice.slnx
dotnet run --project Api
```

- API Base URL: `http://localhost:5205`
- Scalar UI: `http://localhost:5205/scalar/v1`
- OpenAPI JSON: `http://localhost:5205/openapi/v1.json`

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/registrations` | Create a new registration (`201 Created`, `400`, `409`) |
| `GET` | `/api/registrations` | List registrations with optional `participantName`, `type`, `status`, `page`, `pageSize` (`200 OK`, `400`) |
| `GET` | `/api/registrations/{id:guid}` | Get registration by GUID (`200 OK`, `404`) |
| `GET` | `/api/registrations/summary` | Get dashboard KPI counts and financial totals (`200 OK`) |
