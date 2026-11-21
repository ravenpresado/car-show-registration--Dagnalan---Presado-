
function App() {
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

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">
            <h3 className="text-lg font-semibold text-slate-800">
              Registration Dashboard
            </h3>

            <p className="mt-2 text-slate-500">
              Your registration statistics and records will appear here.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
