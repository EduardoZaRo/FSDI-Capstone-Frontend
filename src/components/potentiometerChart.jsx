import "./potentiometerChart.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useNavigate } from 'react-router-dom';
function PotentiometerChart(props) {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(0);
    useEffect(function () {
        let value = props.data.value * 180 / 3.3;
        document.querySelector('.potentiometer-chart .gauge-chart .gauge-value').style.transform= 'rotate('+value+'deg)'; 
    },[props.data.value]);  
    return (
        <div className="potentiometer-chart chart flex-column">
            <div key={props.data.updated_at}>  
                <h1>This is a {props.data.peripheral.peripheral.name}</h1>
                <p>State: {props.data.value} - Update date: {props.data.updated_at}</p>
                <div class="gauge-chart">
                    <div class="gauge-value"></div>
                    <div class="gauge-base"></div>
                    <span class="value">{props.data.value} V</span>
                </div>
                
            </div>
        </div>
    );
}

export default PotentiometerChart;

