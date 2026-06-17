'use client'

import { useState } from 'react'
import { validateLoginForm } from '@/utils/validation'
import { mockLoginCredentials } from '@/data/staticData'
import { useRouter } from 'next/navigation'

export default function LoginForm({ userType }) {
  const router = useRouter()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const captchaAnswer = mockLoginCredentials.captchaAnswer
  
  const refreshCaptcha = () => {
    const newCaptcha = Math.floor(1000000 + Math.random() * 9000000).toString()
    setCaptcha('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')
    setIsLoading(true)

    const validationErrors = validateLoginForm(loginId, password, captcha, captchaAnswer)

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
      setSuccessMessage('Login successful! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
          {successMessage}
        </div>
      )}

      {/* Login ID Field */}
      <div className="space-y-2">
        <label htmlFor="login-id" className="block text-sm font-medium text-gray-700">
          LOGIN ID
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">👤</span>
          <input
            id="login-id"
            type="text"
            placeholder="Enter Your User Id or Email Id"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value)
              if (errors.loginId) {
                const newErrors = { ...errors }
                delete newErrors.loginId
                setErrors(newErrors)
              }
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.loginId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.loginId && <p className="text-sm text-red-600">{errors.loginId}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          PASSWORD
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) {
                const newErrors = { ...errors }
                delete newErrors.password
                setErrors(newErrors)
              }
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* CAPTCHA Field */}
      <div className="space-y-2">
        <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
          CAPTCHA
        </label>
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center font-mono font-bold text-xl text-gray-800">
            {captchaAnswer}
          </div>
          <button
            type="button"
            onClick={refreshCaptcha}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg transition-colors"
            title="Refresh CAPTCHA"
          >
            🔄
          </button>
        </div>
      </div>

      {/* CAPTCHA Input Field */}
      <div className="space-y-2">
        <label htmlFor="captcha-input" className="block text-sm font-medium text-gray-700">
          ENTER CAPTCHA
        </label>
        <input
          id="captcha-input"
          type="text"
          placeholder="0000"
          value={captcha}
          onChange={(e) => {
            setCaptcha(e.target.value)
            if (errors.captcha) {
              const newErrors = { ...errors }
              delete newErrors.captcha
              setErrors(newErrors)
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.captcha ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.captcha && <p className="text-sm text-red-600">{errors.captcha}</p>}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {isLoading ? 'LOGGING IN...' : 'LOGIN'}
      </button>

      {/* Cancel Button */}
      <button
        type="button"
        className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors"
      >
        CANCEL
      </button>
    </form>
  )
}
