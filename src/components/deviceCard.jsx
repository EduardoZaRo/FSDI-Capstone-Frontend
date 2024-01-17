import "./deviceCard.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
function DeviceCard(props) {
    const auth = useAuthContext();
    const navigate = useNavigate();
    useEffect(function () {
        console.log("devicecard",props)
    },[props]);  
    function deleteDevice(){
        console.log("deleting : ", props.data.id)
        auth.deleteDeviceById(props.data.id).
        then((response)=>{
            props.toggleDelete()
            navigate('/dashboard');
        }).catch(()=>{

        })
    }
    return (
        <div className="device-card flex-column">
            
            <Link to="/device-details" state={ props.data }>
                <h1 className='device-name'>{props.data.name}</h1>
                <p className='device-micro'><i className="bi bi-cpu"></i>{props.data.microcontroller.name}</p>

                <div className="device-peripherals m-auto">
                {
                    props.data.peripherals.map(e => <p className='peripheral'><i className={"bi bi-"+e.icon}></i>{e.name}</p>)
                }
                </div>

            </Link>
            <div className="buttons-container flex">
                <button className="update-btn">
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