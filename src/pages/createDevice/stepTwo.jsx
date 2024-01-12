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
function StepTwo(props) {
    
  const [peripherals, setPeripherals] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);

  const auth = useAuthContext();
  const location = useLocation();
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState(location.state.microcontroller);
  useEffect(function () {
    loadPeripherals();
    console.log(location);
  }, []);

  function loadPeripherals() {
    const service = new DataService();
    let data = service.getElements();
    setPeripherals(data);
  }
  function addPeripheral(elementID) {
    let copy = [...selectedPeripherals];
    let elementToAdd = searchElementByID(peripherals, elementID);
    copy.push(elementToAdd);
    if (isPeripheralAllowed()) {
      setSelectedPeripherals(copy);
    } else {
      alert(
        "You cannot add more peripherals because your microcontroller doesnt have more pins"
      );
    }
  }

  function removePeripheral(selectedIndex) {
    let copy = [...selectedPeripherals];
    copy.splice(selectedIndex, 1);
    console.log(copy);
    setSelectedPeripherals(copy);
  }
  function searchElementByID(elements, elementID) {
    let elementToAdd;
    elements.forEach((element) => {
      if (element._id == elementID) {
        elementToAdd = element;
        return;
      }
    });
    return elementToAdd;
  }
  function isPeripheralAllowed() {
    let microAvailablePins = selectedMicrocontroller.availablePins;
    let neededPins = 0;
    selectedPeripherals.forEach((se) => {
      neededPins += se.neededPins;
    });
    console.log(neededPins, microAvailablePins);
    return neededPins > microAvailablePins ? false : true;
  }
  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={1} />

        <SelectElementSection
          title={"Select a peripheral"}
          selectedElements={[...selectedPeripherals]}
          removeElement={removePeripheral}
          availableElements={[...peripherals]}
          addSelectedElement={addPeripheral}
        />

        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2">Prev</button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={selectedPeripherals.length == 0 ? true : false}> <Link to="/step-three" state={{microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}}className="text-white">Next</Link> </button>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;
