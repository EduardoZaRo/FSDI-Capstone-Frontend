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
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        auth.logout()//.then(()=>{setLoading(false);}).catch(()=>{setLoading(false);});
    }, []);
    return (
        // loading ? <LoadingScreen/> : <Navigate to="/login" />
        <>
            {loading ? <LoadingScreen/> : <Navigate to="/login" />}
        </>

    );
}

export default Logout;
