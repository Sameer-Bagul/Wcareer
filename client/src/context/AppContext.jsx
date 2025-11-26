import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext(); // do the tut about the react hooks and context api

export const AppContextProvider = (props) => {
    
    axios.defaults.withCredentials = true; // to send cookies with the request to the server

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAuthState = async () => {
        try {
            console.log('Checking authentication state...');
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
            console.log('Auth response:', data);
            if (data.success) {
                setIsLoggedin(true);
                await getUserData();
            } else {
                setIsLoggedin(false);
            }
        } catch (error) {
            console.log('Auth check failed:', error);
            setIsLoggedin(false);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const getUserData = async () => {
        try {
            console.log('Fetching user data...');
            const {data} = await axios.get(backendUrl + '/api/user/data');
            console.log('User data response:', data);
            if (data.success) {
                setUserData(data.userData);
            } else {
                setUserData(null);
                toast.error(data.message);
            }
        } catch (error) {
            console.log('User data fetch failed:', error);
            setUserData(null);
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                toast.success('Logged out successfully');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData,
        logout,
        isLoading
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

