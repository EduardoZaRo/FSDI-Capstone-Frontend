import './loadingScreen.css';
import { useAuthContext } from "../state/authContext";
import {useEffect} from 'react';
function LoadingScreen({children}){
    const auth = useAuthContext();
    useEffect(()=>{
        console.log("Loading screen", auth, children)
    }, [])
    
    return(
        <>
            {/* {auth.getGlobalLoading() === true ? <div className="loading-animation-container center" style={{position: "absolute", width: "100vw", height: "100vh"}}><div className="loading-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : children} */}
            <div className="loading-animation-container center" style={{position: "absolute", width: "100vw", height: "100vh"}}><div className="loading-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </>
    );
}
export default LoadingScreen;