import "./resetPassword.css";
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import StoreContext from "../state/authContext";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
function ResetPassword(props) {
    const [email, setEmail] = useState("");
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const auth = useAuthContext();

    useEffect(function () {
    }, []);
    function submitForm(){
        if(email === ""){
            setFormError("Please enter a mail");
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setFormError("Please enter a valid mail");
        }
        else{
            // auth.resetPassword({
            //     "email": email
            // }).then((response)=>{
            //     setVerifySuccess("Check your email for a reset link");
            // }).catch((error)=>{
            //     setFormError("Something went wrong: " + error.response.data.email);
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
    return (
        <div className="page flex-row reset-page center">
            <div className="flex form reset-form">
                <h2 className="center text-center">We will send you and email to reset your password</h2>
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-envelope"></i>
                    </span>
                    <input
                        type="email"
                        id="user-email"
                        className=""
                        placeholder="Your email"
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className={"form-alert " + formAlert.color} display={formAlert ? "show" : "none"}>{formAlert.text}</div>
                <button type="submit" className="" onClick={submitForm}>
                    Send mail <i className="bi bi-box-arrow-in-right"></i>
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
