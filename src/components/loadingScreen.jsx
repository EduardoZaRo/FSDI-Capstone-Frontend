import './loadingScreen.css';
import { useAuthContext } from "../state/authContext";
import { useLoader } from '../state/loaderContext';
import {useEffect} from 'react';
function LoadingScreen({children}){
    const {loading, message} = useLoader();
    useEffect(()=>{
        console.log("Loading screen",  children)
    }, [])
    
    return(
        loading ? <div className="loading-animation-container center" style={{position: "absolute", width: "100vw", height: "100vh"}}><div className="loading-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>{message}</div> : null
    );
}
export default LoadingScreen;