import "./dashboard.scss";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import DeviceCard from "../components/deviceCard";
import { useAuthContext } from "../state/authContext";
function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const auth = useAuthContext();
    useEffect(function () {
        auth.getUserDevices().then((response)=>{
            setDevices(response.data)
            console.log(response.data)
        }).catch((error)=>{
        })
    },[]);  
    return (
        <div className="page dashboard-page flex-column">
            {   
                devices.length &&
                devices.map(d =>  <DeviceCard key={d.microcontroller.name} data={d}/>)
            }
        </div>
    );
}

export default Dashboard;