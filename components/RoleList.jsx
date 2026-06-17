'use client'

import { useState } from 'react'
import Link from 'next/link'
import { staticRoles } from '@/data/staticData'
import RoleDetailsModal from './RoleDetailsModal'

export default function RoleList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Roles')
  const [selectedRole, setSelectedRole] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredRoles = staticRoles.filter((role) => {
    const matchesSearch = 
      role.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.nameMarathi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All Roles' || role.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600 text-sm">System Administration &gt; Role Management</p>
        </div>
        <Link
          href="/dashboard/create-role"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-block"
        >
          + Add Role
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search Role (Name, Description, ID...)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Roles</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
          🔄
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">ROLE ID</th>
              <th className="px-4 py-3 font-semibold text-gray-700">ROLE NAME (ENGLISH)</th>
              <th className="px-4 py-3 font-semibold text-gray-700">ROLE NAME (MARATHI)</th>
              <th className="px-4 py-3 font-semibold text-gray-700">ROLE DESCRIPTION</th>
              <th className="px-4 py-3 font-semibold text-gray-700">STATUS</th>
              <th className="px-4 py-3 font-semibold text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoles.map((role) => (
              <tr key={role.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{role.id}</td>
                <td className="px-4 py-3 font-medium">{role.nameEnglish}</td>
                <td className="px-4 py-3">{role.nameMarathi}</td>
                <td className="px-4 py-3 text-gray-600">{role.description.substring(0, 40)}...</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    role.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {role.status === 'Active' ? '● Active' : '● Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    title="View"
                  >
                    👁️
                  </button>
                  <button
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredRoles.length)} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredRoles.length)} of {filteredRoles.length} roles
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition-colors"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Role Details Modal */}
      {selectedRole && (
        <RoleDetailsModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </div>
  )
}
