import { CalendarDays, CarFront, MapPin } from 'lucide-react'
import RegistrationsPage from './pages/RegistrationsPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
              <CarFront className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                AutoVista Events
              </p>
              <h1 className="font-display text-2xl font-bold tracking-wide text-white">
                Car Show 2027 Registration Dashboard
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              Sorsogon City Coliseum
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              Event Operations
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RegistrationsPage />
      </main>
    </div>
  )
}

export default App
