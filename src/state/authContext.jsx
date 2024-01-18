import {useState, useEffect, createContext, useContext} from 'react';

import useAuth from "./useAuth";
import LoadingScreen from '../components/loadingScreen';

const authContext = createContext({
    user: {},
    csrftoken: null,
    loading: false,
    setGlobalLoading: () => {},
    getGlobalLoading: () => {},
    getCSRFToken: async () => {},
    login: async () => {},
    logout: async () => {},
    isAuthenticated: () => {},
    getAuthenticatedUser: async () => {},
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
    return (
        <authContext.Provider value={auth}>
            {auth.loading ? <LoadingScreen/> : props.children}
        </authContext.Provider>
    );
}

export {AuthProvider, useAuthContext};