'use client'

import { useState } from 'react'
import { validateCreateRoleForm } from '@/utils/validation'
import { useRouter } from 'next/navigation'

export default function CreateRoleForm() {
  const router = useRouter()
  const [nameEnglish, setNameEnglish] = useState('')
  const [nameMarathi, setNameMarathi] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Active')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    if (errors.description) {
      const newErrors = { ...errors }
      delete newErrors.description
      setErrors(newErrors)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')
    setIsLoading(true)

    const validationErrors = validateCreateRoleForm(nameEnglish, nameMarathi, description)

    if (validationErrors.length > 0) {
      const errorMap = {}
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message
      })
      setErrors(errorMap)
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      setSuccessMessage('Role created successfully! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
          {successMessage}
        </div>
      )}

      {/* Role Name English */}
      <div className="space-y-2">
        <label htmlFor="name-english" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          ROLE NAME (ENGLISH)
        </label>
        <input
          id="name-english"
          type="text"
          placeholder="Enter English Role Name (e.g. Verification Officer)"
          value={nameEnglish}
          onChange={(e) => {
            setNameEnglish(e.target.value)
            if (errors.nameEnglish) {
              const newErrors = { ...errors }
              delete newErrors.nameEnglish
              setErrors(newErrors)
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.nameEnglish ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.nameEnglish && <p className="text-sm text-red-600">{errors.nameEnglish}</p>}
      </div>

      {/* Role Name Marathi */}
      <div className="space-y-2">
        <label htmlFor="name-marathi" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          ROLE NAME (MARATHI)
        </label>
        <input
          id="name-marathi"
          type="text"
          placeholder="मराठीतून भूमिका नाव प्रविष्ट करा (उदा. पडताळणी अधिकारी)"
          value={nameMarathi}
          onChange={(e) => {
            setNameMarathi(e.target.value)
            if (errors.nameMarathi) {
              const newErrors = { ...errors }
              delete newErrors.nameMarathi
              setErrors(newErrors)
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.nameMarathi ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.nameMarathi && <p className="text-sm text-red-600">{errors.nameMarathi}</p>}
      </div>

      {/* Created By (Read-only) */}
      <div className="space-y-2">
        <label htmlFor="created-by" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          CREATED BY (READ-ONLY)
        </label>
        <input
          id="created-by"
          type="text"
          value="Super Admin"
          disabled
          className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Role Status Toggle */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          ROLE DESCRIPTION
        </label>
        <textarea
          id="description"
          placeholder="Describe the responsibilities and scope of this role in the system..."
          value={description}
          onChange={handleDescriptionChange}
          rows="6"
          maxLength="500"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">{description.length}/500 chars</p>
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? 'CREATING ROLE...' : 'CREATE ROLE'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors"
        >
          CANCEL
        </button>
      </div>
    </form>
  )
}
