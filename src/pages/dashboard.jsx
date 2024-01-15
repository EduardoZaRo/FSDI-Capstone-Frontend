import "./dashboard.scss";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import DeviceCard from "../components/deviceCard";
import { useAuthContext } from "../state/authContext";
import LoadingScreen from '../components/loadingScreen';
function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useAuthContext();
    useEffect(function () {
        setLoading(true);
        auth.getUserDevices()
        .then((response)=>{
            setDevices(response.data)
            console.log(response.data)
            setLoading(false);
        }).catch((error)=>{
            setLoading(false);
        })
    },[]);  
    return (
        loading ? <LoadingScreen/> :
        <div className="page dashboard-page flex-column center">
            {   
                devices.length !== 0 ?
                devices.map(d =>  <DeviceCard key={d.microcontroller.name} data={d}/>)
                : <h1>No devices found, try creating one!</h1>
            }
        </div>
    );
}

export default Dashboard;