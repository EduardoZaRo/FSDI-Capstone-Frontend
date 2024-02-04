import './deviceDetails.css';
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../state/authContext";
import { useLoader } from "../state/loaderContext";
import LedChart from '../components/ledChart';
import PotentiometerChart from '../components/potentiometerChart';
import BuzzerChart from '../components/buzzerChart';
function DeviceDetails(props){
    const location = useLocation();
    const auth = useAuthContext();
    const [microcontroller, setMicrocontroller] = useState({});
    const [reads, setReads] = useState([]);
    const { showLoader, hideLoader } = useLoader();
    var displayReads = false;

    useEffect(function () {
        const fetchRefresh = setInterval(() =>  {
        if(location.state){
            console.log("device details", location.state)
            let promises = location.state.peripherals.map(async (p) => {
                let result = await auth.getDevicePeripheralRead(location.state.id, p.id)
                return new Promise((res, rej) => {res(result)})
            })
            // showLoader("Loading peripherals...");
            Promise.all(promises)
            .then((results) => {
                let copy = []
                for(let result of results){
                    
                    copy.push(result.data)
                    console.log(copy, displayReads)
                    
                }
                setReads(copy)
                displayReads = true;
                // hideLoader();
            })
            .catch((errors)=>{
                console.log(errors)
                // hideLoader();
            })
            // auth.setGlobalLoading(true);
            // for(const peripheral of location.state.peripherals){
            //     auth.getDevicePeripheralRead(location.state.id, peripheral.id)
            //     .then((response)=>{
            //         let copy = [...reads]
            //         copy.push(response.data)
            //         console.log(copy, auth.getGlobalLoading())
            //         setReads(copy)
            //     })
            //     .catch((error)=>{
            //         console.log(error)
            //     })
            // }
            // auth.setGlobalLoading(false);
            // console.log(auth.getGlobalLoading())
        }
        }, 500);
        return () => clearInterval(fetchRefresh);
    }, []);
    function renderPeripheralChart(read){
        if(read.peripheral.peripheral.name === "LED"){
            return <LedChart key={read.updated_at} data={read}/>
        }
        if(read.peripheral.peripheral.name === "POTENTIOMETER"){
            return <PotentiometerChart key={read.updated_at} data={read}/>
        }
        if(read.peripheral.peripheral.name === "BUZZER"){
            return <BuzzerChart key={read.updated_at} data={read}/>
        }
    }
    return(
        <div className="device-details page flex center">
            {
                (reads.length !== 0) ? 
                
                <div className="peripherals-charts">
                    {reads.map(r=>
                        // <div key={r.updated_at}>  
                        //     <h1>This is a {r.peripheral.peripheral.name}</h1>
                        //     <p>State: {r.value} - Update date: {r.updated_at}</p>
                        //     <div className="led-diagram"></div>
                        //     <br />
                        // </div>
                        // <LedChart key={r.updated_at} data={r}/>
                        <>  
                            {renderPeripheralChart(r)}
                            <br />
                        </>

                    )}
                </div>

                : <h1>No data in db to read...</h1>
            }
        </div>
    );
}
export default DeviceDetails;