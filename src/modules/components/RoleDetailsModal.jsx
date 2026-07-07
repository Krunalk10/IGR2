export default function RoleDetailsModal({ role, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Role Details</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Role ID */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">ID: {role.id}</p>
        </div>

        {/* Details Grid */}
        <div className="space-y-6">
          {/* English Name */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              ROLE NAME (ENGLISH)
            </p>
            <p className="text-lg text-gray-900 font-semibold">{role.nameEnglish}</p>
          </div>

          {/* Marathi Name */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              ROLE NAME (MARATHI)
            </p>
            <p className="text-lg text-gray-900 font-semibold">{role.nameMarathi}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              STATUS
            </p>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                role.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {role.status === 'Active' ? '🟢' : '🔴'} {role.status}
            </span>
          </div>

          {/* Created By */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              CREATED BY
            </p>
            <p className="text-gray-900">{role.createdBy}</p>
          </div>

          {/* Created On */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              CREATED ON
            </p>
            <p className="text-gray-900">{role.createdOn}</p>
          </div>

          {/* Updated By */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              UPDATED BY
            </p>
            <p className="text-gray-900">{role.updatedBy}</p>
          </div>

          {/* Updated On */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
              UPDATED ON
            </p>
            <p className="text-gray-900">{role.updatedOn}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">
              DESCRIPTION
            </p>
            <p className="text-gray-700 leading-relaxed">{role.description}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-8 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Close Details
        </button>
      </div>
    </div>
  )
}
