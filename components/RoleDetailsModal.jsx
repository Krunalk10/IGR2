'use client'

export default function RoleDetailsModal({ role, onClose }) {
  if (!role) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔐</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Role Details</h2>
              <p className="text-sm text-gray-600">ID: {role.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Role Names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Role Name (English)
              </label>
              <p className="text-lg font-bold text-gray-900">{role.nameEnglish}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Role Name (Marathi)
              </label>
              <p className="text-lg font-bold text-gray-900">{role.nameMarathi}</p>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Status
              </label>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                role.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {role.status === 'Active' ? '● Active' : '● Inactive'}
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Created By
              </label>
              <p className="text-gray-900 font-medium">{role.createdBy}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Created On
              </label>
              <p className="text-gray-900">{role.createdOn}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Updated By
              </label>
              <p className="text-gray-900 font-medium">{role.updatedBy}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Updated On
            </label>
            <p className="text-gray-900">{role.updatedOn}</p>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Description
            </label>
            <p className="text-gray-900 leading-relaxed">{role.description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
