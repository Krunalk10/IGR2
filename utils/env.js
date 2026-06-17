// Application Environment Configuration
// Import environment variables with fallback defaults

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development'
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'DRS Portal'
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
export const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000')

// Authentication
export const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'
export const SESSION_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600')
export const TOKEN_EXPIRY = parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRY || '604800')
export const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-key-change-in-production'

// Feature Flags
export const FEATURE_FLAGS = {
  enableBiometric: process.env.NEXT_PUBLIC_ENABLE_BIOMETRIC === 'true',
  enableMultiLanguage: process.env.NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE !== 'false',
  enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
}

// Logging
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
export const ENABLE_DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true'

// File Upload
export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB
export const ALLOWED_FILE_TYPES = (process.env.ALLOWED_FILE_TYPES || 'pdf,jpg,png,docx').split(',')

// Logger utility
export const logger = {
  debug: (message, data = null) => {
    if (ENABLE_DEBUG) console.log(`[DEBUG] ${message}`, data)
  },
  info: (message, data = null) => {
    if (['debug', 'info'].includes(LOG_LEVEL)) console.info(`[INFO] ${message}`, data)
  },
  warn: (message, data = null) => {
    console.warn(`[WARN] ${message}`, data)
  },
  error: (message, data = null) => {
    console.error(`[ERROR] ${message}`, data)
  },
}

// Validate environment on startup
export const validateEnvironment = () => {
  const errors = []

  if (!SESSION_SECRET || SESSION_SECRET === 'dev-secret-key-change-in-production') {
    if (APP_ENV === 'production') {
      errors.push('SESSION_SECRET must be set in production environment')
    }
  }

  if (!API_BASE_URL) {
    errors.push('API_BASE_URL is required')
  }

  if (errors.length > 0) {
    logger.error('Environment validation failed:', errors)
    if (APP_ENV === 'production') {
      throw new Error('Environment validation failed: ' + errors.join(', '))
    }
  }

  return true
}

// Get environment summary
export const getEnvironmentSummary = () => {
  return {
    app: {
      name: APP_NAME,
      version: APP_VERSION,
      environment: APP_ENV,
    },
    api: {
      baseUrl: API_BASE_URL,
      timeout: API_TIMEOUT,
    },
    auth: {
      enabled: AUTH_ENABLED,
      sessionTimeout: SESSION_TIMEOUT,
    },
    features: FEATURE_FLAGS,
    logging: {
      level: LOG_LEVEL,
      debugEnabled: ENABLE_DEBUG,
    },
  }
}
