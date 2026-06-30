// DemoRoleService.js
// Service for interacting with the real backend API.
// The API requires an x-api-key header for authentication. The key
// should be stored in an environment variable (e.g., REACT_APP_API_KEY)
// and accessed via process.env.REACT_APP_API_KEY.

const API_BASE = '/api/EmployeeRegistration';
const API_KEY = import.meta.env.VITE_API_KEY || '';

export async function createDemoRole(roleData) {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Demo API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  // Assume the backend returns the created role object (including id, createdAt, etc.)
  return data;
}

// Fetch a list of roles from the backend.
export async function getDemoRoles() {
  const response = await fetch(`${API_BASE}/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Demo API error: ${response.status} ${errorText}`);
  }

  const json = await response.json();
  // Expect the API to return an array of role objects under a 'data' key.
  const roles = json.data || [];
  return { success: true, data: roles };
}
