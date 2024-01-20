import "./deviceCard.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
import { useLoader } from "../state/loaderContext";

function DeviceCard(props) {
    const { showLoader, hideLoader } = useLoader();
    const auth = useAuthContext();
    const navigate = useNavigate();
    useEffect(function () {
        console.log("devicecard",props)
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
                <button className="update-btn center">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="delete-btn" onClick={deleteDevice}>
                    <i className="bi bi-trash3"></i>
                </button>
            </div>

        </div>
    );
}

export default DeviceCard;