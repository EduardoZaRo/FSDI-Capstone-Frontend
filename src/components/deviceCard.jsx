import "./deviceCard.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
import { useLoader } from "../state/loaderContext";
import Highlight from 'react-highlight'; 
import hljs from "highlight.js";
function DeviceCard(props) {
    const { showLoader, hideLoader } = useLoader();
    const auth = useAuthContext();
    const navigate = useNavigate();
    useEffect(function () {
        console.log("devicecard",props);
        hljs.highlightAll();
    },[]);  
    function deleteDevice(){
        showLoader("Deleting : "+ props.data.id);
        auth.deleteDeviceById(props.data.id).
        then((response)=>{
            
            props.toggleDelete()
            hideLoader();
        }).catch(()=>{
            hideLoader();
        })
    }
    
    function generateCode(){
        console.log("generating code", props.data)
        showLoader("Generating code of "+ props.data.name);
        props.data.peripherals.map(p=>(p.peripheral["deviceID"] = p.id))
        console.log(props.data.peripherals, "XD")
        // auth.getNewDeviceCode(props.data).
        auth.getNewDeviceCode({
            'id': props.data.id,
            'name': props.data.name,
            'microcontroller': props.data.microcontroller,
            'peripherals': props.data.peripherals.map(p=>p.peripheral)
        }).
        then((response)=>{
            props.data.code = JSON.parse(response.data).code;
            document.getElementById("code").innerHTML = JSON.parse(response.data).code;
            navigator.clipboard.writeText(JSON.parse(response.data).code);
            hideLoader();
            // alert("The code is now in your clipboard!");
        }).catch(()=>{
            hideLoader();
        })
    }
    return (
        <div className="device-card flex-column">
            
            <Link to="/device-details" state={ props.data }>
                <h1 className='device-name'>{props.data.name}</h1>
                <p className='device-micro'><i className="bi bi-cpu"></i>{props.data.microcontroller.name}</p>

                <div className="device-peripherals m-auto">
                {
                    props.data.peripherals.map(e => <p className='peripheral'><i className={"bi bi-"+e.peripheral.icon}></i>{e.peripheral.name}</p>)
                }
                </div>

            </Link>
            <div className="buttons-container flex">
                <button className="update-btn center" onClick={()=>alert("Not available :(")}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="code-btn center" onClick={generateCode}>
                    <i className="bi bi-file-earmark-code"></i>
                </button>
                <button className="delete-btn" onClick={deleteDevice}>
                    <i className="bi bi-trash3"></i>
                </button>
            </div>
            <div className="code" id="code" style={{display: props.data.code ? "block" : "none", marginTop: "1rem"}}>    
                <p>Now the code is in your clipboard!</p>      
                <Highlight className='language-arduino'>
                    {props.data.code}
                </Highlight>
            </div>
        </div>
    );
}

export default DeviceCard;
