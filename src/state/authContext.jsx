import {useState, useEffect, createContext, useContext} from 'react';

import useAuth from "./useAuth";
const authContext = createContext({
    user: {},
    csrftoken: null,
    getCSRFToken: async () => {},
    login: async () => {},
    logout: async () => {},
    isAuthenticated: async () => {},
    getAuthenticatedUser: async () => {},
    signup: async () => {},
    resetPassword: async () => {},
    resetPasswordConfirm: async () => {}, 
    changePassword: async () => {},
});
const useAuthContext = () => useContext(authContext);
function AuthProvider(props){
    const auth = useAuth();
    return (
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    );
}

export {AuthProvider, useAuthContext};