import './loadingScreen.css';
import { useAuthContext } from "../state/authContext";
function LoadingScreen({children}){
    const auth = useAuthContext();
    return(
        <>
            {auth.loading ? <div className="loading-animation-container center" style={{position: "absolute", width: "100vw", height: "100vh"}}><div className="loading-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : children}
        </>
    );
}
export default LoadingScreen;