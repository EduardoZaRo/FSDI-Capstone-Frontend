import "./dashboard.css";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import DeviceCard from "../components/deviceCard";
import { useAuthContext } from "../state/authContext";
import { useLoader } from "../state/loaderContext";

function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const [onDelete, setOnDelete] = useState(false);
    const { loading, showLoader, hideLoader } = useLoader();

    const auth = useAuthContext();
       
    useEffect(function () {
        showLoader("Loading devices...");
        auth.getUserDevices()
        .then((response)=>{
            setDevices(response.data)
            hideLoader();
        }).catch((error)=>{
            hideLoader();
        })
    },[onDelete]);  
    const toggleDelete = () => {setOnDelete(!onDelete);}
    return (
        <div className="page dashboard-page flex-column center">
            {   
                loading === false ?
                    devices.length ? devices.map(d =>  <DeviceCard key={d.id} data={d} toggleDelete={toggleDelete}/>) : <h1>No devices found :(</h1>
                : <h1>Loading...</h1>
            }
        </div>
    );
}

export default Dashboard;