'use client'

import RoleList from '@/components/RoleList'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">System Administration Overview</p>
      </div>

      <RoleList />
    </div>
  )
}
