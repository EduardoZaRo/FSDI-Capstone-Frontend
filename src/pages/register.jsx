import "./register.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useAuthContext } from "../state/authContext";
import SuperCaptcha from '../components/superCaptcha';
import { useRef } from 'react';
function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCaptchaResult, setUserCaptchaResult] = useState(-1);
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const [firstCaptchaNumber, setFirstCaptchaNumber] = useState(0);
    const [secondCaptchaNumber, setSecondCaptchaNumber] = useState(0);
    const [expectedCaptchaResult, setExpectedCaptchaResult] = useState(0);
    const auth = useAuthContext();
    const childRef = useRef(null);
    useEffect(function () {
    }, []);
    
    function verifyForm(){
        let catpchaErrorMessage = childRef.current.verifyCaptcha();

        if(email === ""){
            setFormError("Please enter a mail");
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setFormError("Please enter a valid mail");
        }
        else if(password === ""){
            setFormError("Please enter a password");
        } 
        else if (password.length < 8){
            setFormError("You password must be at least 8 characters long");
        }
        else if(catpchaErrorMessage !== ""){
            childRef.current.reGenerateCaptcha();
            setFormError(catpchaErrorMessage);
        }
        else{
            setVerifySuccess("Valid");
            
            // auth.signup({
            //     "email": email,
            //     "password": password,
            // })
            // .then(()=>{
            //     return (<Navigate to="/login"/>);
            // })
            // .catch(()=>{
            //     setFormError("Something went wrong, try again later")
            // })
        }
        
    }

    function setVerifySuccess(alertText){
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

    const LoginRedirect = ({ children }) => {
        if (formAlert.text !== "Valid") {
            return children;
        }
        return(<Navigate to="/login" />) ;
    };
    return (
        formAlert.text !== "Valid" ?
            <div className="page register-page center">
                <div className="flex form register-form slide-to-left">
                    <h1 className="center text-center">Register</h1>
                    <div className="flex input-group">
                        <span className="center">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <input
                            type="email"
                            id="user-email"
                            className=""
                            placeholder="test@domain.com"
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="flex input-group">
                        <span className="center">
                            <i className="bi bi-lock"></i>
                        </span>
                        <input
                            type="password"
                            id="user-password"
                            className=""
                            placeholder="*********"
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <SuperCaptcha ref={childRef}/>
                    <div className={"form-alert " + formAlert.color} display={formAlert.text === "" ? undefined : 1}>{formAlert.text}</div>

                    <button type="submit" className="" onClick={verifyForm}>
                        Register <i className="bi bi-box-arrow-in-right"></i>
                    </button>
                </div>

            </div>
        : <Navigate to="/login" />
        
    );
}

export default Register;
