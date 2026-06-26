import { apiRequest } from "./ApiClient";

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
