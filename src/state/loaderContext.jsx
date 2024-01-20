import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const showLoader = (message) => {
        setLoading(true);
        setMessage(message);
    };

    const hideLoader = () => {
        setLoading(false);
        setMessage("");
    };

    return (
        <LoaderContext.Provider value={{ loading, message, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    return useContext(LoaderContext);
};
