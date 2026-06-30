import { apiRequest } from "./ApiClient";

// Demo API endpoint for creating roles (using placeholder service)
export async function createRole(roleData) {
  // Using reqres.in as a demo POST endpoint. It returns an id and createdAt.
  const response = await fetch('https://reqres.in/api/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleData),
  });

  const result = await response.json();
  if (!response.ok) {
    return { success: false, message: result.error || "Failed to create role" };
  }
  // Merge demo response with original payload for consistency
  return {
    success: true,
    data: { ...roleData, id: result.id, createdAt: result.createdAt },
    message: "Role created successfully (demo)",
  };
}

export async function getRoles() {
  return await apiRequest('/api/EmployeeRegistration/roles', {
    method: "GET",
  });
}
