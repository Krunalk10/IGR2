'use client'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            DEPARTMENT OF REGISTRATION AND STAMPS
          </h1>
          <p className="text-sm text-gray-600">GOVERNMENT OF MAHARASHTRA</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:text-blue-600" title="Notifications">
            🔔
          </button>
          <button className="hover:text-blue-600" title="Profile">
            👤
          </button>
          <button className="hover:text-blue-600" title="Settings">
            ⚙️
          </button>
        </div>
      </div>
    </header>
  )
}
