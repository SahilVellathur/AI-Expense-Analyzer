// src/apiConfig.ts

/**
 * Central configuration for API endpoints.
 * In development, it defaults to localhost.
 * In production (Vercel/Netlify), it uses the VITE_API_URL environment variable.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  EXPENSES: `${API_BASE_URL}/expenses`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  UPLOAD: `${API_BASE_URL}/expenses/upload`,
};
