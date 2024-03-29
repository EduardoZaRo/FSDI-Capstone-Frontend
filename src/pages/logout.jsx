import "./login.scss";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import {useContext} from 'react';
import StoreContext from "../state/authContext";
import Cookies from 'js-cookie';
import { useAuthContext } from "../state/authContext";
import { useLoader } from "../state/loaderContext";
import LoadingScreen from '../components/loadingScreen';
function Logout(props) {
    const auth = useAuthContext();
    const { showLoader, hideLoader } = useLoader();
    useEffect(()=>{
        showLoader("Closing session...");
        auth.logout()
        .then(()=>{
            auth.setCsrftoken(null);
            auth.setUser(null);
            hideLoader();
        }).catch(()=>{hideLoader();})
    }, []);
    return (
            // <LoadingScreen>
                <Navigate to="/login" />
            // </LoadingScreen>

    );
}

export default Logout;
