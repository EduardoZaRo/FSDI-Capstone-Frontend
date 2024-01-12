import "./createDevice.css";
import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import {Link} from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";
import { useAuthContext } from "../../state/authContext";
import SelectElementSection from "./components/selectElementSection";
import ShowGeneratedCode from "./components/showGeneratedCode";
function StepOne(props) {
  const [microcontrollers, setMicrocontrollers] = useState([]);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);

  const auth = useAuthContext();

  useEffect(
    function () {
      loadMicrocontrollers();
    },
    []
  );

  function loadMicrocontrollers(){
    const service = new DataService();
    let data = service.getMicrocontrollers();
    setMicrocontrollers(data);
  }

  function addSelectedMicrocontroller(elementID){
    let copy = [];
    let elementToAdd = searchElementByID(microcontrollers, elementID);
    copy.push(elementToAdd);
    setSelectedMicrocontroller(copy)
  }
  function removeSelectedMicrocontroller(){
    setSelectedMicrocontroller([])
  }
  function searchElementByID(elements, elementID){
    let elementToAdd;
    elements.forEach((element)=>{
      if(element._id == elementID){
        elementToAdd = element;
        return;
      }
    })
    return elementToAdd;
  }


  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={0}/>

         <SelectElementSection title={"Select a microcontroller"} selectedElements={[...selectedMicrocontroller]} removeElement={removeSelectedMicrocontroller} availableElements={[...microcontrollers]} addSelectedElement={addSelectedMicrocontroller} />
                  


        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={true}>Prev</button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={selectedMicrocontroller.length == 0 ? true : false}> <Link to="/step-two" state={{microcontroller: selectedMicrocontroller[0]}}className="text-white">Next</Link> </button>
        </div>
      </div>
    </div>
      
  );
}

export default StepOne;


// Sample device 
// {
//   "microcontroller": {
//       "name": "ESP32",
//       "availablePins": 32,
//       "infoLink": "https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf",
//       "_id": "1"
//   },
//   "peripherals": [{
//       "title": "LED",
//       "type": "INPUT",
//       "position": "left",
//       "icon": "lightbulb",
//       "neededPins": 1,
//       "_id": "1"
//   }]
// }