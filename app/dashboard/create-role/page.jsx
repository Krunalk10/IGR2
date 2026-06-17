'use client'

import CreateRoleForm from '@/components/CreateRoleForm'

export default function CreateRolePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <a href="/dashboard" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
          ← Back to Role List
        </a>
        <h1 className="text-3xl font-bold text-gray-900">Create Role</h1>
        <p className="text-gray-600 mt-2">System Administration &gt; Role Management &gt; Create Role</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <CreateRoleForm />
      </div>
    </div>
  )
}
