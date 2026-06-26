import { useNavigate } from 'react-router-dom'

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  const navigate = useNavigate()

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "roles", label: "Role Management" },
    { id: "office", label: "Office Management" },
    { id: "employees", label: "Employee Management" },
    { id: "zones", label: "Zone Management" },
  ];

  const handleMenuClick = (pageId) => {
    setActivePage(pageId)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src="/IGRAuthoritySeal.png"
              alt="IGR Authority Seal"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-sm font-bold text-gray-900">ADMIN PORTAL</h2>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
              activePage === item.id
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
