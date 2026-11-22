# Car Show Registration System

A web-based Car Show Registration System developed for Integrative Programming 2. This project uses a React frontend and an ASP.NET Core Web API backend with SQLite database persistence.

## Team Members and Responsibilities

| Member | Role |
|---|---|
| Ian Kenneth Dagnalan | Backend Developer |
| Raven Shane Presado | Frontend Developer |

## Project Structure

```text
car-show-registration/
├── backend/
│   ├── Api/
│   ├── Application/
│   ├── Domain/
│   ├── Infrastructure/
│   └── VerticalSlice.slnx
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── docs/
│   ├── screenshots/
│   └── CarShow-Backend-Documentation-Template.docx
├── .gitignore
└── README.md
```

## Technologies Used

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Vertical Slice Architecture
- Scalar API Documentation

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS

## Backend Setup and Installation

From the repository root, restore the dependencies:

```powershell
dotnet restore backend/VerticalSlice.slnx
```

Build the solution:

```powershell
dotnet build backend/VerticalSlice.slnx
```

Run the API:

```powershell
dotnet run --project backend/Api/Api.csproj
```

### Backend URLs

- API: http://localhost:5205
- Scalar API Documentation: http://localhost:5205/scalar/v1
- OpenAPI: http://localhost:5205/openapi/v1.json
- HTTPS API: https://localhost:7254

## Frontend Setup and Installation

Open another terminal and navigate to the frontend folder:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the frontend in your browser:

http://localhost:5173/

## API Testing

The backend includes an `Api.http` file containing 40 manual test scenarios.

Use the requests in:

```text
backend/Api/Api.http
```

You can also explore and test the API endpoints using Scalar:

http://localhost:5205/scalar/v1

## Documentation and Screenshots

Backend documentation and project evidence are stored in:

```text
docs/
```

Screenshots should be saved in:

```text
docs/screenshots/
```

Refer to the backend documentation template for the required screenshots, explanations, and reflection questions.

## How to Run the Full Application

1. Start the backend API.
2. Start the React frontend in a separate terminal.
3. Open http://localhost:5173/ in your browser.
4. Verify that the frontend can communicate with the backend API.

---

**Project:** Car Show Registration System  
**Course:** Integrative Programming 2  
**Institution:** Computer Communication Development Institute (CCDI), Sorsogon Campus