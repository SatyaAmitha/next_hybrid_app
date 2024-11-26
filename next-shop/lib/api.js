// lib/api.js
export class ApiError extends Error {
  constructor(url, status, data) {
    super(`API request to ${url} failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}

export async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // More comprehensive cookie handling
    });

    // Try to parse the response body
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Throw an ApiError with status and parsed data
      throw new ApiError(url, response.status, data);
    }

    return data;
  } catch (error) {
    // Log the full error for debugging
    console.error('fetchJson Error:', {
      url,
      message: error.message,
      status: error.status,
      data: error.data
    });

    // Re-throw the error to be caught by the caller
    throw error;
  }
}

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};