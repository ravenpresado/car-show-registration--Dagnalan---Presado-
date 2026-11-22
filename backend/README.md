# Backend API

This folder contains the supplied CCDI Vertical Slice starter solution completed for the Car Show Registration System.

Run from the repository root:

```bash
dotnet restore backend/VerticalSlice.slnx
dotnet build backend/VerticalSlice.slnx
dotnet run --project backend/Api/Api.csproj
```

Scalar: http://localhost:5205/scalar/v1  
OpenAPI: http://localhost:5205/openapi/v1.json

See the root `README.md` for endpoint contract, business rules, and test instructions. See `Api/Api.http` for the 40 manual test scenarios.
