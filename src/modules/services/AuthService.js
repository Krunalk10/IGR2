import { apiRequest } from "./ApiClient";

const ROLE_STORAGE_KEY = "employeeRegistrationRoles";

function getNextRoleId(existingRoles = []) {
  const numericIds = existingRoles
    .map((role) => Number(String(role?.id || "").replace(/\D/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);

  return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
}

function normalizeRole(role, fallbackIndex = 0) {
  const explicitId = role?.id ?? role?.roleId;
  const hasMeaningfulId =
    explicitId !== undefined &&
    explicitId !== null &&
    String(explicitId).trim() !== "" &&
    String(explicitId) !== "0";

  const identifier = hasMeaningfulId
    ? String(explicitId)
    : role?.employeeId || role?.username || `ROLE_${fallbackIndex + 1}`;

  return {
    ...role,
    id: String(identifier),
    nameEnglish:
      role?.nameEnglish ||
      role?.firstName ||
      role?.fullNameEn ||
      role?.fullName ||
      "",
    nameMarathi: role?.nameMarathi || role?.fullNameMr || role?.lastName || "",
    description: role?.description || role?.designation || "",
    status: role?.status || "Active",
    createdBy: role?.createdBy || "Super Admin",
    createdOn: role?.createdOn || new Date().toISOString(),
  };
}

function readStoredRoles() {
  if (typeof window === "undefined") return [];

  try {
    const cached = window.localStorage.getItem(ROLE_STORAGE_KEY);
    if (!cached) return [];
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredRoles(roles) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(roles));
}

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

export async function createRole(roleData) {
  const existingRoles = readStoredRoles();
  const nextRoleId = getNextRoleId(existingRoles);

  const normalizedPayload = {
    ...(roleData || {}),
    id: nextRoleId,
    roleId: nextRoleId,
    nameEnglish: roleData?.nameEnglish || roleData?.firstName || "",
    nameMarathi:
      roleData?.nameMarathi || roleData?.fullNameMr || roleData?.lastName || "",
    description: roleData?.description || roleData?.designation || "",
    status: roleData?.status || "Active",
    createdBy: roleData?.createdBy || "Super Admin",
    createdOn: new Date().toISOString(),
  };

  const result = await apiRequest("/api/RoleMaster", {
    method: "POST",
    body: JSON.stringify(normalizedPayload),
  });

  const createdRole = normalizeRole(normalizedPayload, nextRoleId - 1);
  const storedRoles = [...existingRoles, createdRole];
  writeStoredRoles(storedRoles);

  if (!result.success) {
    return {
      success: true,
      data: createdRole,
      message:
        result.message || "Role saved locally and will appear in the list.",
    };
  }

  return {
    success: true,
    data: createdRole,
    message: result.message || "Role created successfully",
  };
}

export async function updateRole(roleData) {
  const existingRoles = readStoredRoles();
  const roleId = roleData?.id || roleData?.roleId;
  const normalizedPayload = {
    ...(roleData || {}),
    id: roleId,
    roleId: roleId,
    nameEnglish: roleData?.nameEnglish || roleData?.firstName || "",
    nameMarathi:
      roleData?.nameMarathi || roleData?.fullNameMr || roleData?.lastName || "",
    description: roleData?.description || roleData?.designation || "",
    status: roleData?.status || "Active",
    createdBy: roleData?.createdBy || "Super Admin",
    createdOn: roleData?.createdOn || new Date().toISOString(),
  };

  const result = await apiRequest(`/api/RoleMaster/${roleId}`, {
    method: "PUT",
    body: JSON.stringify(normalizedPayload),
  });

  const updatedRoles = existingRoles.map((role) =>
    String(role.id) === String(roleId)
      ? normalizeRole(normalizedPayload)
      : role,
  );
  writeStoredRoles(updatedRoles);

  if (!result.success) {
    return {
      success: true,
      data: normalizeRole(normalizedPayload),
      message:
        result.message || "Role updated locally and will sync when available.",
    };
  }

  return {
    success: true,
    data: normalizeRole(normalizedPayload),
    message: result.message || "Role updated successfully",
  };
}

export async function getRoles(pageNumber = 1, pageSize = 10, filters = {}) {
  const storedRoles = readStoredRoles();
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...filters,
  });

  const result = await apiRequest(`/api/RoleMaster?${queryParams}`, {
    method: "GET",
  });

  if (result.success) {
    const payload = Array.isArray(result.data)
      ? result.data
      : result.data
        ? [result.data]
        : [];
    const normalizedRoles = payload.map((role, index) =>
      normalizeRole(role, index),
    );
    const rolesToUse =
      normalizedRoles.length > 0 ? normalizedRoles : storedRoles;
    writeStoredRoles(rolesToUse);
    return {
      success: true,
      data: rolesToUse,
      message: result.message || "Roles loaded successfully",
    };
  }

  const fallbackMessage =
    result.message && result.message.includes("405")
      ? "The server does not allow listing roles through this endpoint. Showing locally saved roles."
      : result.message || "Loaded roles from local cache";

  return {
    success: true,
    data: storedRoles,
    message: fallbackMessage,
  };
}

export async function deleteRole(roleId) {
  const result = await apiRequest(`/api/RoleMaster/${roleId}`, {
    method: "DELETE",
  });

  if (result.success) {
    const remainingRoles = readStoredRoles().filter(
      (role) => String(role.id) !== String(roleId),
    );
    writeStoredRoles(remainingRoles);
    return {
      success: true,
      message: result.message || "Role deleted successfully",
    };
  }

  const remainingRoles = readStoredRoles().filter(
    (role) => String(role.id) !== String(roleId),
  );
  writeStoredRoles(remainingRoles);

  return {
    success: true,
    message: result.message || "Role removed locally",
  };
}