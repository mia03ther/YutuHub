// ============================================================
// API Response Helpers
// ============================================================
// Provides a standardized JSON response format used across all
// API endpoints. Centralises the shape so the frontend can rely
// on a consistent contract.
// ============================================================

import type { ApiResponse } from "../types";

/**
 * Send a successful API response.
 */
export function sendSuccess<T>(
  data: T,
  message = "OK",
  code = 0,
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    code,
  };
}

/**
 * Send an error API response.
 */
export function sendError(
  error: string,
  code = 1,
): ApiResponse<never> {
  return {
    success: false,
    error,
    code,
  };
}
