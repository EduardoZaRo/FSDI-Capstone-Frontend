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
  const auth = useAuthContext();
  const location = useLocation();
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState(location.state.microcontroller);
  const [selectedPeripherals, setSelectedPeripherals] = useState(location.state.peripherals);
  useEffect(function () {
  }, []);
  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={2} />

        <ShowGeneratedCode selectedMicrocontroller={selectedMicrocontroller} selectedPeripherals={selectedPeripherals}/>

        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2">Prev</button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={selectedPeripherals.length == 0 ? true : false}> <Link to="/step-three" state={{microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}}className="text-white">Next</Link> </button>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
