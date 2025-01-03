// AppContextProvider.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = backendUrl;

    // Add axios interceptor for handling errors
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                setIsLoggedin(false);
                setUserData(null);
            }
            return Promise.reject(error);
        }
    );

    const getUserData = async () => {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message || "Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            if (error.response?.status !== 401) {  // Don't show error for unauthorized
                toast.error(error.response?.data?.message || "Failed to fetch user data");
            }
        }
    };

    const getAuthState = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/api/auth/is-auth');
            if (data.success) {
                setIsLoggedin(true);
                await getUserData();
            } else {
                setIsLoggedin(false);
                setUserData(null);
            }
        } catch (error) {
            console.error("Auth state error:", error);
            setIsLoggedin(false);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <AppContext.Provider
            value={{
                backendUrl,
                isLoggedin,
                setIsLoggedin,
                userData,
                setUserData,
                getUserData,
                getAuthState,
                isLoading
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};