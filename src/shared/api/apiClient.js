const API_BASE_URL = "http://13.232.164.116";

function getAuthToken() {
  if (typeof window === "undefined") return null;

  const token = window.localStorage.getItem("accessToken");
  return token ? token : null;
}

export async function apiRequest(endpoint, options = {}) {
  console.log("API URL:", `${API_BASE_URL}${endpoint}`);
  console.log("Request Options:", options);

  try {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    console.log("Response Status:", response.status);

    const text = await response.text();
    let result = {};

    if (text) {
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }
    }

    console.log("Response Data:", result);

    if (!response.ok || result.success === false) {
      return {
        success: false,
        status: response.status,
        message:
          result?.message ||
          `Request failed (${response.status}). Please try again.`,
      };
    }

    return {
      success: true,
      status: response.status,
      ...result,
      data: result?.data ?? result,
    };
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);

    return {
      success: false,
      message:
        "Could not reach the server. Check your connection and try again.",
    };
  }
}
