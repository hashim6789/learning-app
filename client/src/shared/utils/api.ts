import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { config } from "../configs/config";

// Extend InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // Adding a custom property for retry logic
}

// Define the base API URL
const API_BASE_URL = config.API_BASE_URL; // Replace with your API URL

// Function to get a cookie by name
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with the request
});

// Request Interceptor
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    // Ensure headers exist
    config.headers = config.headers || {};

    // Get the token from cookies
    const token = getCookie("accessToken");
    console.log(token);
    if (token) {
      // Attach the token to the Authorization header
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Check for 401 Unauthorized errors and handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // The refresh token is automatically included in the request because it's stored as httpOnly cookie
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Store the new access token in cookies (not refresh token since it's httpOnly)
        document.cookie = `Authorization=${accessToken}; HttpOnly; Secure; SameSite=Strict; path=/`;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear tokens from cookies and redirect to login
        document.cookie =
          "Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log("error found: Login required");
        const user =
          JSON.parse(localStorage.getItem("user") || "null") ?? "learner";
        console.log("object", user);
        window.location.href = `/${user}/login`; // Update with your login route
      }
    }

    // Propagate other errors
    return Promise.reject(error);
  }
);

export default api;
