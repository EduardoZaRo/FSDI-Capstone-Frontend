import "./login.scss";
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import StoreContext from "../state/authContext";
import {BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import LoginImage from '../assets/img/select-board.png';
import LoadingScreen from '../components/loadingScreen';
function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const [loading, setLoading] = useState(false);
    const auth = useAuthContext();
    const {state} = useLocation();
    const navigate = useNavigate();
    function verifyForm(){
        if(password === ""){
            setFormError("Please enter a password");
        } 
        else if (password.length < 8){
            setFormError("You password must be at least 8 characters long");
        }
        else if(email === ""){
            setFormError("Please enter a mail");
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setFormError("Please enter a valid mail");
        }
        else{
            setFormValid("Valid form");
            setLoading(true);
            auth.login({
                "email": email,
                "password": password,
            }).then(()=>{
                props.setLoggedIn(false);
                setLoading(false);
                // return (<Link to="/"/>);
                navigate("/");
                
            }).catch(()=>{
                setLoading(false);
                setFormError("Mail or password incorrect, try again");
            })

        }

    }

    function setFormValid(alertText){
        setFormAlert({
            "text": alertText,
            "color": "form-success"
        });
    }
    function setFormError(alertText){
        setFormAlert({
            "text": alertText,
            "color": "form-warning"
        });
    }
    return (
        !auth.user ? 
        loading? <LoadingScreen/> :
        <div className="page flex-row center login-page">
            
            <div className="flex form login-form pop-up">
                {state ? <h3 className="center text-center">You need to login to see this page</h3> : <h1 className="center text-center">Login</h1>}
                
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-envelope"></i>
                    </span>
                    <input
                        type="email"
                        name="email"
                        id="user-email"
                        className=""
                        placeholder="Your email"
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-lock"></i>
                    </span>
                    <input
                        type="password"
                        name="password"
                        autoComplete="on"
                        id="user-password"
                        className=""
                        placeholder="Your password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                </div>

                <div className={"form-alert " + formAlert.color} display={formAlert ? "show" : "none"}>{formAlert.text}</div>
                <button type="submit" className="" onClick={verifyForm}>
                Login <i className="bi bi-box-arrow-in-right"></i>
                </button>
                <Link to="/register" className="register-link"><h3>Don't have an account yet? Sign up <i className="bi bi-box-arrow-up-right"></i></h3></Link>
            </div>
        </div>
        :
        <Navigate to="/"/>
    );
}

export default Login;
