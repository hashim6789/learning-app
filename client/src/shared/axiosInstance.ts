// import axios, {
//   AxiosResponse,
//   InternalAxiosRequestConfig,
//   AxiosError,
// } from "axios";

// import { config } from "./configs/config";

// // Define base URL
// const API_BASE_URL = config.API_BASE_URL;

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to get a cookie by name
// const getCookie = (name: string): string | null => {
//   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
//   return match ? match[2] : null;
// };

// // Extend Axios request config to include _retry
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean; // Adding _retry to the request config
// }

// // Add Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
//     const token = getCookie("Authorization"); // Get token from cookies
//     console.log("token =", token);
//     if (token) {
//       // Attach access token to the Authorization header if it exists in cookies
//       config.headers = config.headers || {};
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// // Add Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;
//     console.log("error :", error);
//     console.log("original", originalRequest);

//     // Check if originalRequest exists and if it's a 401 error
//     if (
//       originalRequest &&
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Get the refresh token from cookies
//         const refreshToken = getCookie("refreshToken");
//         console.log("refreshTokens", refreshToken);

//         // If no refresh token, redirect to login
//         if (!refreshToken) {
//           throw new Error("No refresh token available.");
//         }

//         // Try refreshing the access token using the refresh token
//         const refreshResponse = await axios.post(`${API_BASE_URL}/refresh`, {
//           refreshToken,
//         });

//         const { accessToken, refreshToken: newRefreshToken } =
//           refreshResponse.data;

//         // Store the new tokens in HttpOnly cookies
//         document.cookie = `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; path=/`;
//         document.cookie = `refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; path=/`;

//         // Set the new access token in the headers and retry the original request
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Handle the error if the refresh token is invalid or expired
//         console.error("Token refresh failed:", refreshError);
//         // Clear cookies
//         document.cookie =
//           "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//         document.cookie =
//           "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

//         // Redirect to login page
//         window.location.href = "/learner/login";
//       }
//     }

//     // Propagate other errors
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

import { config } from "./configs/config";

// Define base URL
const API_BASE_URL = config.API_BASE_URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get a cookie by name (used in the refresh token flow)
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Extend Axios request config to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // Adding _retry to the request config
}

// Add Request Interceptor
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    // The token will be automatically sent via cookies in requests.
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
    console.log("Error:", error);
    console.log("Original request:", originalRequest);

    // Check if originalRequest exists and if it's a 401 error
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from cookies
        const refreshToken = getCookie("refreshToken");
        console.log("Refresh token:", refreshToken);

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

        // Store the new tokens in HttpOnly cookies (these will be handled by the server)
        document.cookie = `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; path=/`;
        document.cookie = `refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; path=/`;

        // Set the new access token in the headers and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle the error if the refresh token is invalid or expired
        console.error("Token refresh failed:", refreshError);
        // Clear cookies
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // Redirect to login page
        window.location.href = "/login"; // Update this URL to your login page
      }
    }

    // Propagate other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
