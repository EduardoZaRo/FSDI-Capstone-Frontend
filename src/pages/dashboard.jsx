import "./dashboard.css";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import DeviceCard from "../components/deviceCard";
import { useAuthContext } from "../state/authContext";
import LoadingScreen from '../components/loadingScreen';

function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const [onDelete, setOnDelete] = useState(false);
    const auth = useAuthContext();

    useEffect(function () {
        auth.setGlobalLoading(true);
        auth.getUserDevices()
        .then((response)=>{
            setDevices(response.data)
            console.log(response.data)
            auth.setGlobalLoading(false);
        }).catch((error)=>{
            auth.setGlobalLoading(false);
        })
    },[onDelete]);  
    const toggleDelete = () => {setOnDelete(!onDelete);}
    return (
        <div className="page dashboard-page flex-column center">
            {   
                devices.length !== 0 ?
                devices.map(d =>  <DeviceCard key={d.microcontroller.name} data={d} toggleDelete={toggleDelete}/>)
                : <h1>No devices found, try creating one!</h1>
            }
        </div>
    );
}

export default Dashboard;