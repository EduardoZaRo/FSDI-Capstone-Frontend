import "./dashboard.scss";
import DataService from "../services/dataService";
import {useEffect, useState} from "react";
import DeviceCard from "../components/deviceCard";
function Dashboard(props) {
    const [userData, setUserData] = useState({});
    useEffect(function () {
        loadUserData();
        console.log(userData.devices)
    },[userData]);  
    function loadUserData(){
        let service = new DataService();
        let data = service.getUserData();
        setUserData(data);
    }
    return (
        <div className="page dashboard-page flex-column">
            {   
                userData.devices &&
                userData.devices.map(d =>  <DeviceCard data={d}/>)
            }
        </div>
    );
}

export default Dashboard;