import BASE_URL from "./api";

export async function createRole(data) {
  try {
    const response = await fetch(`${BASE_URL}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      success: response.ok,
      data: result,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
