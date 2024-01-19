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
            auth.setGlobalLoading(false);
        }).catch((error)=>{
            auth.setGlobalLoading(false);
        })
    },[]);  
    const toggleDelete = () => {setOnDelete(!onDelete);}
    return (
        <>
                {/* {auth.loading === true && <LoadingScreen/>}  */}
        <div className="page dashboard-page flex-column center">
            {   
                devices.length !== 0 && auth.getGlobalLoading() === false ?
                devices.map(d =>  <DeviceCard key={d.id} data={d} toggleDelete={toggleDelete}/>)
                : <h1>No devices found, try creating one!</h1>
            }
        </div>
        </>



    );
}

export default Dashboard;