export default function Header({ onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left: Title */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            DEPARTMENT OF REGISTRATION AND STAMPS
          </h2>
          <p className="text-sm text-gray-600">Government of Maharashtra</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Notifications">
            🔔
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Profile">
            👤
          </button>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </div>
    </header>
  )
}
