import { CarFront } from 'lucide-react'
import RegistrationsPage from './pages/RegistrationsPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <CarFront className="h-5 w-5 text-gray-700" aria-hidden="true" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Car Show 2027 Registration Dashboard
              </h1>
              <p className="text-xs text-gray-500">
                AutoVista Events — Sorsogon City Coliseum
              </p>
            </div>
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
