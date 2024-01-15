import "./deviceCard.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
function DeviceCard(props) {
    useEffect(function () {
        console.log("devicecard",props)
    },[]);  
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


        </div>
    );
}

export default DeviceCard;