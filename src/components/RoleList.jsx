import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { staticRoles } from '../data/staticData'
import RoleDetailsModal from './RoleDetailsModal'
import { getDemoRoles } from "../services/DemoRoleService";


export default function RoleList() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Roles')
  const [selectedRole, setSelectedRole] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function loadRoles() {
      // ================= API ==================

      const result = await getDemoRoles();

      if (result.success) {
        setRoles(result.data);
      }

      // ========================================
    }

    loadRoles();
  }, []);

const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
     const matchesSearch =
        role.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.nameMarathi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'All Roles' || role.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])  

  // const filteredRoles = useMemo(() => {
  //   return staticRoles.filter((role) => {
  //     const matchesSearch =
  //       role.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       role.nameMarathi.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       role.id.toLowerCase().includes(searchQuery.toLowerCase())

  //     const matchesStatus =
  //       statusFilter === 'All Roles' || role.status === statusFilter

  //     return matchesSearch && matchesStatus
  //   })
  // }, [searchQuery, statusFilter])

  const handleViewRole = (role) => {
    setSelectedRole(role)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Role Management
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              System Administration &gt; Role Management
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/create-role")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            ➕ Add Role
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search Role (Name, Description, ID...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Roles</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
            🔄
          </button>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  ROLE ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  ROLE NAME (ENGLISH)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  ROLE NAME (MARATHI)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  ROLE DESCRIPTION
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  CREATED BY
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 min-w-[140px]">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                    {role.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {role.nameEnglish}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {role.nameMarathi}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {role.description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                        role.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {/* {role.status === 'Active' ? '🟢' : '🔴'}  */}
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {role.createdBy}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button
                      onClick={() => handleViewRole(role)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View details"
                    >
                      👁️
                    </button>
                    <button
                      className="text-amber-600 hover:text-amber-800 transition-colors"
                      title="Edit role"
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete role"
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
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing 1 to {Math.min(filteredRoles.length, 5)} of{" "}
            {filteredRoles.length} roles
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Role Details Modal */}
      {isModalOpen && selectedRole && (
        <RoleDetailsModal
          role={selectedRole}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
