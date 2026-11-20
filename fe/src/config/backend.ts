export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") ||
  "http://localhost:5000/api";

export const BACKEND_ORIGIN = new URL(API_URL).origin;
