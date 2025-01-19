import { useEffect } from "react";
import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://medica-server-side.vercel.app", 
  withCredentials:true
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = UseAuth();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("ACCESS TOKEN");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          try {
            await logOut(); // Properly log out the user
            navigate("/login", { replace: true }); // Navigate to login page
          } catch (err) {
            console.error("Error during logout:", err);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
