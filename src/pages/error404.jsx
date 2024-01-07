import './error404.css';
import erro404Img from "../assets/img/error-404.png";

function Error404(){
    return(
        <div className="page flex-column center error-404-page">
            <h1>bruh, 404 not found haha</h1>
            <img src={erro404Img} alt="Error 404" />
        </div>
    );
}
export default Error404;