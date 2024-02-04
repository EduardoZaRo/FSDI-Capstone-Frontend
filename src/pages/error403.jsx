import './error403.css';
import erro403Img from "../assets/img/error-403.png";
import {Link} from "react-router-dom";
function Error403(){
    return(
        <div className="page flex-column center error-403-page">
            <h1>Error 403, forbidden</h1>
            <img src={erro403Img} alt="Error 403" />
            <Link className="login-redirect" to="/login">Try to login</Link>
        </div>
    );
}
export default Error403;