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
        <div className="led-chart chart flex-column">
            <div key={props.data.updated_at}>  
                <h1>This is a {props.data.peripheral.peripheral.name}</h1>
                <p>State: {props.data.value} - Update date: {props.data.updated_at}</p>
                <div className={"led-diagram " + (props.data.value === '1' ? " on " : " off ") }></div>
            </div>
        </div>
    );
}

export default LedChart;