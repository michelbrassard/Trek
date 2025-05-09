// import axios from "axios";

// let onUnauthorized: (() => void) | null = null;

// export const setUnauthorizedHandler = (handler: () => void) => {
//   onUnauthorized = handler;
// };

// const api = axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true, 
// });

// api.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             await api.post("/auth/refresh");
//             return api(originalRequest);
//         } catch (e) {
//             if (axios.isAxiosError(e)) {
//                 console.error("Refresh failed:", e.response?.data);
//             } else {
//                 console.error("Unexpected error:", e);
//             }
//             if (onUnauthorized) onUnauthorized();
//         }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;