import {useState} from "react";
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
function useAuth(){
    const [user, setUser] = useState(null);
    const [csrftoken, setCsrftoken] = useState(null);
    // const [loading, setLoading] = useState(false);
    var loading = false;
    function setLoading(state){
        loading = state;
    }

    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
    axios.defaults.headers = {
        "Content-Type": "application/json",
        "X-Csrftoken": csrftoken,
    };
    function setGlobalLoading(state){
        setLoading(state)
    }
    function getGlobalLoading(){
        return loading;
    }
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
    function logout(){
        console.log("logout function");
        // await getCSRFToken()
        // setLoading(true);
        // setCsrftoken(null);
        // setUser(null);
        return axios.post("/logout/", {});

    }
    function isAuthenticated(){
        console.log("isAuthenticated function");
        return axios.get("/is-authenticated/");
    }
    function getAuthenticatedUser(){
        console.log("getAuthenticatedUser function");
        // await getCSRFToken();
        // let apiResponse = await axios.get("/profile/");
        // setUser(apiResponse.data);
        return axios.get("/profile/");
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

    function deleteDeviceById(data){
        return axios.post("/delete-device/", {id: data})
    }

    async function getDevicePeripheralRead(deviceID, peripheralID){
        return axios.post("/get-device-read/", 
            {"deviceID": deviceID, "peripheralID": peripheralID}
        )
    }
    return {user, csrftoken, loading, setCsrftoken, setUser, setGlobalLoading, getGlobalLoading, getCSRFToken, login, logout, isAuthenticated, getAuthenticatedUser, signup, resetPassword, resetPasswordConfirm, changePassword, getNewDeviceCode, getAllMicrocontrollers, getAllPeripherals, saveDevice, getUserDevices, getAllDevices,deleteDeviceById, getDevicePeripheralRead}
}
export default useAuth;