import { apiRequest } from "./ApiClient";

export async function loginUser(username, password) {
  const result = await apiRequest("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!result.success) {
    return result;
  }

  return {
    success: true,
    message: result.message,
    user: result.data.user,
    role: result.data.role,
    accessToken: result.data.auth.accessToken,
  };
}

export function saveAuthData(token, user) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export async function logoutUser() {
  const result = await apiRequest("/api/Auth/logout", {
    method: "POST",
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  return result;
}

export async function createRole(roleData) {
  return await apiRequest("/api/EmployeeRegistration/role", {
    method: "POST",
    body: JSON.stringify(roleData),
  });
}

export async function getRoles() {
  return await apiRequest("/api/EmployeeRegistration/roles", {
    method: "GET",
  });
}
