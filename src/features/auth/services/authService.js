import { apiRequest } from "../../../shared/api/apiClient";

export async function loginUser(username, password) {
  const result = await apiRequest("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!result.success) {
    return result;
  }

  const accessToken =
    result?.data?.auth?.accessToken ||
    result?.data?.accessToken ||
    result?.accessToken ||
    result?.token ||
    null;
  const user = result?.data?.user || result?.user || null;
  const role = result?.data?.role || result?.role || null;

  if (accessToken) {
    saveAuthData(accessToken, user);
  }

  return {
    success: true,
    message: result.message,
    user,
    role,
    accessToken,
  };
}

export function saveAuthData(token, user) {
  if (typeof window === "undefined") return;

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
