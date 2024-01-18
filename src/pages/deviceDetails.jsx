import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../state/authContext";
function DeviceDetails(props){
    const location = useLocation();
    const auth = useAuthContext();
    const [microcontroller, setMicrocontroller] = useState({});
    const [reads, setReads] = useState([]);

    var displayReads = false;

    useEffect(function () {
        if(location.state){
            console.log("device details", location.state)
            let promises = location.state.peripherals.map(async (p) => {
                let result = await auth.getDevicePeripheralRead(location.state.id, p.id)
                return new Promise((res, rej) => {res(result)})
            })
            
            Promise.all(promises)
            .then((results) => {
                let copy = []
                for(let result of results){
                    
                    copy.push(result.data)
                    console.log(copy, displayReads)
                    
                }
                setReads(copy)
                displayReads = true;
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
    }, []);
    return(
        <div className="device-details page flex center">
            {
                (reads.length !== 0) ? 
                
                <div className="peripherals-charts">
                    {reads.map(r=>
                        <div key={r.updated_at}>  
                            <h1>This is a {r.peripheral.peripheral.name}</h1>
                            <p>State: {r.value} - Update date: {r.updated_at}</p>
                            <br />
                        </div>

                    )}
                </div>

                : <h1>Loading...</h1>
            }
        </div>
    );
}
export default DeviceDetails;