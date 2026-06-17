export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUserId = (userId) => {
  return userId.trim().length >= 3 && userId.trim().length <= 50
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateCaptcha = (captcha, expectedCaptcha) => {
  return captcha.trim() === expectedCaptcha
}

export const validateRoleName = (name) => {
  return name.trim().length >= 3 && name.trim().length <= 100
}

export const validateRoleDescription = (description) => {
  return description.trim().length <= 500
}

export const validateLoginForm = (loginId, password, captcha, expectedCaptcha) => {
  const errors = []

  if (!loginId.trim()) {
    errors.push({ field: 'loginId', message: 'Login ID is required' })
  } else if (!validateUserId(loginId)) {
    errors.push({ field: 'loginId', message: 'Login ID must be between 3 and 50 characters' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (!validatePassword(password)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' })
  }

  if (!captcha.trim()) {
    errors.push({ field: 'captcha', message: 'CAPTCHA is required' })
  } else if (!validateCaptcha(captcha, expectedCaptcha)) {
    errors.push({ field: 'captcha', message: 'CAPTCHA is incorrect' })
  }

  return errors
}

export const validateCreateRoleForm = (nameEnglish, nameMarathi, description) => {
  const errors = []

  if (!nameEnglish.trim()) {
    errors.push({ field: 'nameEnglish', message: 'English role name is required' })
  } else if (!validateRoleName(nameEnglish)) {
    errors.push({ field: 'nameEnglish', message: 'English role name must be between 3 and 100 characters' })
  }

  if (!nameMarathi.trim()) {
    errors.push({ field: 'nameMarathi', message: 'Marathi role name is required' })
  } else if (!validateRoleName(nameMarathi)) {
    errors.push({ field: 'nameMarathi', message: 'Marathi role name must be between 3 and 100 characters' })
  }

  if (!validateRoleDescription(description)) {
    errors.push({ field: 'description', message: 'Description cannot exceed 500 characters' })
  }

  return errors
}
