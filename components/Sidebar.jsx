'use client'

import Link from 'next/link'
import { navMenuItems } from '@/data/staticData'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-900">ADMIN PORTAL</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navMenuItems.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
          Logout
        </button>
      </div>
    </div>
  )
}
