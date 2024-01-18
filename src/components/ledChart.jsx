import "./ledChart.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
function LedChart(props) {
    const auth = useAuthContext();
    const navigate = useNavigate();
    useEffect(function () {
    },[]);  
    function deleteDevice(){
        console.log("deleting : ", props.data.id)
        auth.deleteDeviceById(props.data.id).
        then((response)=>{
            props.toggleDelete()
        }).catch(()=>{

        })
    }
    return (
        <div className="device-card flex-column">

        </div>
    );
}

export default LedChart;