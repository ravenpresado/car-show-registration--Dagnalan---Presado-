# Car Show 2027 Registration Dashboard (Frontend)

React (Vite) + Tailwind CSS management dashboard for **AutoVista Events — Car Show 2027** at **Sorsogon City Coliseum**.

## Team

| Member | Role |
|---|---|
| Ian Kenneth Dagnalan | Backend Developer |
| Raven Shane Presado | Frontend Developer |

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Lucide React** (`lucide-react`) vector icons
- **Google Fonts**: `Rajdhani` (display headings & KPI numbers), `Plus Jakarta Sans` (UI & table text), `JetBrains Mono` (`tabular-nums` for registration numbers, plate numbers, and ₱ currency)

## Project Structure (`frontend/src/`)

```text
frontend/src/
├── api/
│   ├── registrationsApi.js    # Real fetch calls to the C# Backend API
│   └── sample-data.js         # 25 sample records + browser-side filter/paging/summary helpers
├── hooks/
│   └── useDebounce.js         # 400ms debounce hook for participant search
├── components/
│   ├── KpiCard.jsx            # Single KPI metric card
│   ├── KpiCards.jsx           # 5 KPI cards driven by /api/registrations/summary
│   ├── RegistrationFilters.jsx# Participant search, type & status dropdowns, Clear filters
│   ├── RegistrationTable.jsx  # Horizontally scrollable registrations table
│   ├── StatusBadge.jsx        # Pending / Confirmed / CheckedIn / Cancelled badges
│   ├── PaymentBadge.jsx       # Unpaid / Partial / Paid badges
│   └── Pagination.jsx         # Prev / Next, page numbers, Showing x–y of N, page-size selector
├── pages/
│   └── RegistrationsPage.jsx  # Owns filter, paging, data, loading, empty, and error states
├── utils/
│   └── formatters.js          # Shared ₱ currency and date/time formatters
├── App.jsx
└── index.css
```

## Setup & Running Locally

1. **Configure Environment Variables**
   Copy `.env.example` to `.env.development` (if not already present):

   ```env
   VITE_API_BASE_URL=http://localhost:5205
   ```

2. **Install Dependencies & Run Dev Server**

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

3. **Production Build & Lint**

   ```powershell
   npm run build
   npm run lint
   ```

## Toggling Between `sample-data.js` and `registrationsApi.js`

Both `src/api/sample-data.js` and `src/api/registrationsApi.js` export the exact same async functions and JSON shapes:
- `getRegistrations({ participantName, type, status, page, pageSize })`
- `getSummary()`

To switch data sources in `src/pages/RegistrationsPage.jsx`:

- **Use the live C# Backend API (default):**
  ```js
  import { getRegistrations, getSummary } from '../api/registrationsApi'
  ```
- **Use offline browser sample data (no backend required):**
  ```js
  import { getRegistrations, getSummary } from '../api/sample-data'
  ```

## Shared Backend API Contract

- `GET /api/registrations?participantName=&type=&status=&page=1&pageSize=10`
  - Returns `{ items, page, pageSize, totalCount, totalPages }`
  - Each item includes: `id`, `registrationNumber`, `registrationDate`, `participantName`, `contactNumber`, `email`, `address`, `carMakeModel`, `plateNumber`, `registrationType`, `status`, `registrationFee`, `amountPaid`, `paymentStatus`
- `GET /api/registrations/summary`
  - Returns `{ totalRegistrations, confirmed, checkedIn, pending, cancelled, totalFees, totalPayments, uncollectedPayments }`
  - Cancelled registrations are excluded from monetary totals (`totalFees`, `totalPayments`, `uncollectedPayments`)
