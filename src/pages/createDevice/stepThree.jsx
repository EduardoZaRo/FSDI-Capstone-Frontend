import "./createDevice.css";
import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import { Link } from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";
import { useAuthContext } from "../../state/authContext";
import SelectElementSection from "./components/selectElementSection";
import ShowGeneratedCode from "./components/showGeneratedCode";
import { useLocation } from "react-router-dom";
function StepThree(props) {
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const auth = useAuthContext();
  const location = useLocation();
  useEffect(function () {
    if(location.state){
      setSelectedMicrocontroller(location.state.microcontroller);
      setSelectedPeripherals(location.state.peripherals);
    }
  }, []);

  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={2} />

        <ShowGeneratedCode selectedMicrocontroller={selectedMicrocontroller} selectedPeripherals={selectedPeripherals}/>

        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2"><Link to="/step-two" state={{microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}}className="text-white">Prev</Link></button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2"> <Link to="/dashboard" state={{microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}} className="text-white">Finish</Link> </button>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
