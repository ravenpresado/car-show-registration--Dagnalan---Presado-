import KpiCard from './components/KpiCard'
import { useState } from 'react'
import RegistrationFilters from './components/RegistrationFilters'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-800">
          Car Show Registration System
        </h1>
        <p className="text-sm text-slate-500">
          Registration Management Dashboard
        </p>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 min-h-screen bg-slate-900 p-5">
          <h2 className="text-lg font-bold text-white mb-8">
            Car Show Admin
          </h2>

          <nav className="space-y-2">
            <div className="rounded-lg bg-blue-600 px-4 py-3 text-white">
              Dashboard
            </div>

            <div className="rounded-lg px-4 py-3 text-slate-300">
              Registrations
            </div>

            <div className="rounded-lg px-4 py-3 text-slate-300">
              Payments
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Dashboard Overview
          </h2>

          <p className="mt-2 text-slate-500">
            Welcome to the Car Show Registration Management System.
          </p>

          <div className="mt-8">
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              Registration Statistics
            </h3>

            <div className="mt-8">
              <RegistrationFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onReset={() => {
                  setSearchTerm('')
                  setSelectedType('')
                  setSelectedStatus('')
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                title="Total Registrations"
                value="125"
                description="All registered participants"
                icon="👥"
                color="text-blue-600"
              />

              <KpiCard
                title="Total Payments"
                value="₱75,000"
                description="Payments collected"
                icon="💰"
                color="text-green-600"
              />

              <KpiCard
                title="Confirmed"
                value="95"
                description="Confirmed registrations"
                icon="✅"
                color="text-teal-600"
              />

              <KpiCard
                title="Checked In"
                value="60"
                description="Participants checked in"
                icon="🚗"
                color="text-purple-600"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
