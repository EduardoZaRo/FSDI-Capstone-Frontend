import "./deviceCard.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
function DeviceCard(props) {
    useEffect(function () {
        console.log("devicecard",props)
    },[]);  
    return (
        <div className="device-card flex-column border-solid border-2 border-sky-500 rounded w-4/6 m-auto p-5 hover:bg-red-500 transition-colors">
            
            <Link to="/device-view" state={ props.data }>
                <p><i className="bi bi-cpu"></i>{props.data.microcontroller.name}</p>
                <div className="device-elements m-auto">
                {
                    props.data.peripherals.map(e => <p><i className={"bi bi-"+e.icon}></i>{e.name}</p>)
                }
                </div>
            </Link>


        </div>
    );
}

export default DeviceCard;