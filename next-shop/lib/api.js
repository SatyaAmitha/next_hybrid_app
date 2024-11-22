// lib/api.js

export class ApiError extends Error {
  constructor(url, status) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchJson(url,options) {
  const response = await fetch(url,options);
  if (!response.ok) {
    throw new ApiError(url, response.status);
  }
  return await response.json();
}
export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Usage: await sleep(2000);