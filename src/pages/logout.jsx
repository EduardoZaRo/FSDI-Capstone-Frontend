import "./login.scss";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import {useContext} from 'react';
import StoreContext from "../state/authContext";
import Cookies from 'js-cookie';
import { useAuthContext } from "../state/authContext";
import LoadingScreen from '../components/loadingScreen';
function Logout(props) {
    const auth = useAuthContext();
    useEffect(()=>{
        auth.logout()
    }, []);
    return (
            <LoadingScreen>
                <Navigate to="/login" />
            </LoadingScreen>

    );
}

export default Logout;
