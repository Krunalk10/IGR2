import { useState } from 'react'
import { validateCreateRoleForm } from '../utils/validation'

export default function CreateRoleForm({ onCancel }) {
  const [nameEnglish, setNameEnglish] = useState('')
  const [nameMarathi, setNameMarathi] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Active')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    const validationErrors = validateCreateRoleForm(nameEnglish, nameMarathi, description)

    if (validationErrors.length > 0) {
      const errorMap = {}
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message
      })
      setErrors(errorMap)
      return
    }

    setSuccessMessage('Role created successfully!')
    setTimeout(() => {
      handleReset()
    }, 2000)
  }

  const handleReset = () => {
    setNameEnglish('')
    setNameMarathi('')
    setDescription('')
    setStatus('Active')
    setErrors({})
    setSuccessMessage('')
  }

  const handleErrorClear = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const charCount = description.length

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
          ✓ {successMessage}
        </div>
      )}

      {/* English Role Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          ROLE NAME (ENGLISH)
        </label>
        <input
          type="text"
          value={nameEnglish}
          onChange={(e) => {
            setNameEnglish(e.target.value)
            handleErrorClear('nameEnglish')
          }}
          placeholder="Enter English Role Name (e.g. Verification Officer)"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
            errors.nameEnglish
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.nameEnglish && (
          <p className="text-red-600 text-sm mt-1">{errors.nameEnglish}</p>
        )}
      </div>

      {/* Marathi Role Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          ROLE NAME (MARATHI)
        </label>
        <input
          type="text"
          value={nameMarathi}
          onChange={(e) => {
            setNameMarathi(e.target.value)
            handleErrorClear('nameMarathi')
          }}
          placeholder="मराठीत भूमिका नाव प्रविष्ट करा"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
            errors.nameMarathi
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.nameMarathi && (
          <p className="text-red-600 text-sm mt-1">{errors.nameMarathi}</p>
        )}
      </div>

      {/* Created By (Read-only) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          CREATED BY (READ-ONLY)
        </label>
        <input
          type="text"
          value="Super Admin"
          disabled
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      {/* Role Status Toggle */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          ROLE STATUS
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}
            className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors ${
              status === 'Active' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform ${
                status === 'Active' ? 'translate-x-1' : 'translate-x-9'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {status === 'Active' ? '🟢 Active' : '🔴 Inactive'}
          </span>
        </div>
      </div>

      {/* Role Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          ROLE DESCRIPTION
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value.slice(0, 500))
            handleErrorClear('description')
          }}
          placeholder="Describe the responsibilities and scope of this role in the system..."
          rows="6"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors resize-none ${
            errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <div className="mt-2 flex justify-between items-center">
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}
          <p className="text-gray-600 text-sm ml-auto">{charCount}/500 chars</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          ✓ Create Role
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
