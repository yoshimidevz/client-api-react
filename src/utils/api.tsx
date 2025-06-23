import { getToken } from "./auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
