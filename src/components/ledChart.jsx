import "./ledChart.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
function LedChart(props) {
    const [update, setUpdate] = useState(0);
    const auth = useAuthContext();
    const navigate = useNavigate();
    useEffect(function () {
        console.log("led data", props)
    },[update]);  
    function deleteDevice(){
        console.log("deleting : ", props.data.id)
        auth.deleteDeviceById(props.data.id).
        then((response)=>{
            props.toggleDelete()
        }).catch(()=>{

        })
    }
    function setAction(){
        try{
            console.log(props.data.value)
            auth.setDevicePeripheralAction(props.data.device.id, props.data.peripheral.id, (props.data.value === "1" ? "0" : "1"));
            console.log("set success")
            setUpdate(update + 1);
        }
        catch(e){console.log(e)}
    }
    return (
        <div className="led-chart chart flex-column">
            <div key={props.data.updated_at}>  
                <h1>This is a {props.data.peripheral.peripheral.name}</h1>
                <p>State: {props.data.value} - Update date: {props.data.updated_at}</p>
                <div className={"led-diagram " + (props.data.value === '1' ? " on " : " off ") }></div>
                <button onClick={setAction} className="led-chart-action-btn">Toggle</button>
            </div>
        </div>
    );
}

export default LedChart;