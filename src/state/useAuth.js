import {useState} from "react";
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
function useAuth(){
    const [user, setUser] = useState(null);
    const [csrftoken, setCsrftoken] = useState(null);
    const [waitingRequest, setWaitingRequest] = useState(false);
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
    axios.defaults.headers = {
        "Content-Type": "application/json",
        "X-Csrftoken": csrftoken,
    };
    async function getCSRFToken(){
        console.log("getCSRFToken function");
        try{
            let apiResponse = await axios.get("/csrf-cookie/");
            let csrftokenResponse = apiResponse.data["X-CSRFToken"];
            setCsrftoken(csrftokenResponse);
            axios.defaults.headers["X-CSRFToken"] = csrftokenResponse;
        }
        catch(error){
            console.log(error)
        }
        return csrftoken;
    }
    async function signup(data){
        console.log("signup function");
        await getCSRFToken();
        let apiResponse = await axios.post("/register/", data);
    }
    async function login(data){
        console.log("login function");
        await getCSRFToken();
        let apiResponse = await axios.post("/login/", data);
        setUser(apiResponse.data);
    }
    async function logout(){
        console.log("logout function");
        await getCSRFToken();
        let apiResponse = await axios.post("/logout/", {});
        setCsrftoken(null);
        setUser(null);
    }
    async function isAuthenticated(){
        console.log("isAuthenticated function");
        await getCSRFToken();
        let apiResponse = await axios.get("/is-authenticated/");
    }
    async function getAuthenticatedUser(){
        console.log("getAuthenticatedUser function");
        await getCSRFToken();
        let apiResponse = await axios.get("/profile/");
        setUser(apiResponse.data);
    }

    async function resetPassword(data){
        console.log("reset password");
        await getCSRFToken();
        let apiResponse = await axios.post("/reset-password/", data);
    }
    
    async function resetPasswordConfirm(data){
        console.log("reset password confirm");
        await getCSRFToken();
        let apiResponse = await axios.post("/reset-password/confirm/", data);
    }
    async function changePassword(data){
        console.log("change password");
        await getCSRFToken();
        let apiResponse = await axios.post("/change-password/", data);
    }




    function getNewDeviceCode(data){
        console.log("get code for device")
        return axios.post("/generate-code/", data)
    }
    function getAllMicrocontrollers(){
        return axios.get("/get-microcontrollers/")
    }
    function getAllPeripherals(){
        return axios.get("/get-peripherals/")
    }
    function getAllDevices(){
        return axios.post("/get-peripherals/")
    }
    function saveDevice(data){
        return axios.post("/save-device/", data)
    }
    function getUserDevices(){
        return axios.get("/get-user-devices/")
    }
    return {user, csrftoken, getCSRFToken, login, logout, isAuthenticated, getAuthenticatedUser, signup, resetPassword, resetPasswordConfirm, changePassword, getNewDeviceCode, getAllMicrocontrollers, getAllPeripherals, saveDevice, getUserDevices, getAllDevices}
}
export default useAuth;