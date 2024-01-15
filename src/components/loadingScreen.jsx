import './loadingScreen.css';
function LoadingScreen(){

    return(
        <div className="loading-animation-container center" style={{position: "absolute", width: "100vw", height: "100vh"}}><div className="loading-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        
    );
}
export default LoadingScreen;