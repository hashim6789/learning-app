import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

// Define base URL
const API_BASE_URL = "http://localhost:3000";

// Tokens Key
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Extend Axios request config to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // Adding _retry to the request config
}

// Add Request Interceptor
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      // Attach access token to the Authorization header if it exists
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log("error :", error);
    console.log("original", originalRequest);

    // Check if originalRequest exists and if it's a 401 error
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        console.log("refreshTokens", refreshToken);

        // If no refresh token, redirect to login
        if (!refreshToken) {
          throw new Error("No refresh token available.");
        }

        // Try refreshing the access token using the refresh token
        const refreshResponse = await axios.post(`${API_BASE_URL}/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Store the new tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

        // Set the new access token in the headers and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle the error if the refresh token is invalid or expired
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        // Redirect to login page
        window.location.href = "/learner/login";
      }
    }

    // Propagate other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
