import "./deviceView.scss";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
function DeviceView(props) {
    const { state } = useLocation();
    useEffect(function () {
        console.log(state)
    },[]);  
    return (
        <div className="device-view flex-column gap-5">
            {
                state.elements.map(e => <><p>{e.title} chart</p><hr /></>)
            }
        </div>
    );
}

export default DeviceView;