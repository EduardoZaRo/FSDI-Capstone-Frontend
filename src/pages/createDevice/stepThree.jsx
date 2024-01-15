import "./createDevice.css";
import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";

import DataService from "../../services/dataService";
import { Link } from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";
import { useAuthContext } from "../../state/authContext";
import SelectElementSection from "./components/selectElementSection";
import ShowGeneratedCode from "./components/showGeneratedCode";
import { useLocation, useNavigate } from "react-router-dom";
function StepThree(props) {
  const [deviceName, setDeviceName] = useState("");
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(function () {
    if(location.state){
      setDeviceName(location.state.name);
      setSelectedMicrocontroller(location.state.microcontroller);
      setSelectedPeripherals(location.state.peripherals);
    }
  }, []);
  function saveDevice(){
    setLoading(true);
    auth.saveDevice({
        'name': deviceName,
        'microcontroller': selectedMicrocontroller[0],
        'peripherals': selectedPeripherals
    }).then((response)=>{
        navigate('/dashboard');
    }).catch((error)=>{
        console.log(error)
        setLoading(false);
    })
  }
  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={2} />

        <ShowGeneratedCode deviceName={deviceName} selectedMicrocontroller={selectedMicrocontroller} selectedPeripherals={selectedPeripherals}/>

        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2"><Link to="/step-two" state={{name: deviceName, microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}}className="text-white">Prev</Link></button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2"> <Link to="/dashboard" state={{name: deviceName, microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}} className="text-white" onClick={saveDevice}>Finish</Link> </button>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
