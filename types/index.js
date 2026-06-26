// Role data structure
export const RoleSchema = {
  id: "",
  nameEnglish: "",
  nameMarathi: "",
  description: "",
  status: "Active",
  createdBy: "",
  createdOn: "",
  updatedBy: "",
  updatedOn: "",
};

// User data structure
export const UserSchema = {
  loginId: '',
  email: '',
  role: '',
}

// Login form data structure
export const LoginFormDataSchema = {
  loginId: '',
  password: '',
  captcha: '',
}

// Create role form data structure
export const CreateRoleFormDataSchema = {
  nameEnglish: '',
  nameMarathi: '',
  description: '',
  status: 'Active', // 'Active' | 'Inactive'
}
