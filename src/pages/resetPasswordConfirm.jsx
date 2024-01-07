import "./resetPasswordConfirm.css";
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import StoreContext from "../state/authContext";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Error404 from "./error404";
import { useAuthContext } from "../state/authContext";
function ResetPasswordConfirm(props) {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const auth = useAuthContext();
    const queryParameters = new URLSearchParams(window.location.search);
    const reset_token = queryParameters.get("token");
    useEffect(function () { }, []);
    function submitForm(){
        clearFormAlert();
        if(password === ""){
            setFormError("Please enter a password");
        }
        else if(password.length < 8){
            setFormError("You password must be at least 8 characters long");
        }
        else{
            auth.resetPasswordConfirm({
                "password": password,
                "token": reset_token,
            }).then((response)=>{
                setVerifySuccess("Password reset succesful")
                console.log(response)
            }).catch((error)=>{
                setFormError("Something went wrong: " + error.response.data.password)
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
            "color": "bg-green-400"
        });
    }
    function setFormError(alertText){
        setFormAlert({
            "text": alertText,
            "color": "bg-yellow-400"
        });
    }
    return (
        !reset_token ? <Error404/> :
        <div className="login flex-column m-auto w-4/6">
            <label
            htmlFor="input-group-1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            New password
            </label>
            <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="bi bi-lock"></i>
            </span>
            <input
                type="password"
                id="user-email"
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                onChange={event => setPassword(event.target.value)}
            />
            </div>
            <div className={"form-alert rounded mt-3 text-center " + formAlert.color} display={formAlert ? "show" : "none"}>{formAlert.text}</div>
            <button type="submit" className="rounded text-white flex justify-center p-3 bg-primary w-fit mx-auto my-3" onClick={submitForm}>
                Reset <i className="bi bi-box-arrow-in-right"></i>
            </button>
        </div>
    );
}

export default ResetPasswordConfirm;
