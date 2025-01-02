// AppContextProvider.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    // Configure axios defaults
    axios.defaults.withCredentials = true;
    
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message || "Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            } else {
                setIsLoggedin(false);
                setUserData(false);
            }
        } catch (error) {
            console.error("Auth state error:", error);
            setIsLoggedin(false);
            setUserData(false);
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
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};