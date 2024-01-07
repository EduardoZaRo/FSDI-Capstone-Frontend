import "./led.css";
import axios from 'axios';
import {useEffect,useState} from "react";
import {useContext} from 'react';
function Led(props) {
    const [ledState, setLedState] = useState("-");
    useEffect(function(){
        setInterval(loadState, 5000);
    },[]);
    async function loadState(){
        const response = await axios.post("http://localhost:8000/get-led-state/", JSON.stringify({"xd":"xd"}));
        setLedState(response.data.LED_STATE)    
        console.log(response)
    }
    return (
        <div className="led">
            <p>LED COMPONENT</p>
            <h4>{ledState}</h4>
        </div>
    );
}

export default Led;