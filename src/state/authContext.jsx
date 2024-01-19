import {useState, useEffect, createContext, useContext} from 'react';

import useAuth from "./useAuth";
import LoadingScreen from '../components/loadingScreen';

const authContext = createContext({
    user: {},
    csrftoken: null,
    loading: false,
    setCsrftoken: () => {},
    setUser: () => {},
    setGlobalLoading: () => {},
    getGlobalLoading: () => {},
    getCSRFToken: () => {},
    login: async () => {},
    logout: async () => {},
    isAuthenticated: () => {},
    getAuthenticatedUser: () => {},
    signup: async () => {},
    resetPassword: async () => {},
    resetPasswordConfirm: async () => {}, 
    changePassword: async () => {},
    getNewDeviceCode: () => {},
    getAllPeripherals:  () => {},
    getAllMicrocontrollers: () => {},
    saveDevice: () => {},
    getUserDevices: () => {},
    getAllDevices: () => {},
    deleteDeviceById: () => {},
    getDevicePeripheralRead: async () => {},
});
const useAuthContext = () => useContext(authContext);
function AuthProvider(props){
    const auth = useAuth();
    useEffect(()=>{}, [])
    return (
        <authContext.Provider value={auth}>
            
            {/* <LoadingScreen> */}
                {props.children}
            {/* </LoadingScreen> */}
        </authContext.Provider>
    );
}

export {AuthProvider, useAuthContext};