import "./login.scss";
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import StoreContext from "../state/authContext";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const auth = useAuthContext();

    useEffect(function () {
    }, []);

    function verifyLogin(){
        clearFormAlert();
        if(oldPassword === "" || newPassword === "" ){
            setFormError("Please enter passwords");
        } 
        else if (oldPassword.length < 8 || newPassword.length < 8){
            setFormError("Passwords must be at least 8 characters long");
        }
        else{
            setVerifySuccess("Valid form");
            auth.changePassword({
                "old_password": oldPassword,
                "new_password": newPassword,
            }).then((response)=>{
                setVerifySuccess("Password change success")
            }).catch((error)=>{
                console.log("xd",error)
                setFormError("Something went wrong")
            })

        }

    }
    function clearFormAlert(){
        setFormAlert({
            "text": "",
            "color": ""
        });
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
        <div className="page flex-column center change-pwd-page">
            <div className="flex form change-pwd-form slide-in-left">
                <h1 className="center text-center">Change password</h1>
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-lock"></i>
                    </span>
                    <input
                        type="password"
                        autoComplete="on"
                        id="old-password"
                        className=""
                        placeholder="Old password"
                        onChange={event => setOldPassword(event.target.value)}
                    />
                </div>

                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-lock"></i>
                    </span>
                    <input
                        type="password"
                        autoComplete="on"
                        id="new-password"
                        className=""
                        placeholder="New password"
                        onChange={event => setNewPassword(event.target.value)}
                    />
                </div>

                <div className={"form-alert " + formAlert.color} display={formAlert ? "show" : "none"}>{formAlert.text}</div>
                <button type="submit" className="" onClick={verifyLogin}>
                    Change password <i class="bi bi-arrow-clockwise"></i>
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;
