import "./createDevice.css";
import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import {Link} from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";
import { useAuthContext } from "../../state/authContext";
import SelectElementSection from "./components/selectElementSection";
import ShowGeneratedCode from "./components/showGeneratedCode";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../state/loaderContext";

function StepOne(props) {
  const [deviceName, setDeviceName] = useState("");
  const [microcontrollers, setMicrocontrollers] = useState([]);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const auth = useAuthContext();
  const location = useLocation();
  const { loading, showLoader, hideLoader } = useLoader();

  useEffect(
    function () {
      loadMicrocontrollers();
      console.log(location)
      if(location.state){
        setDeviceName(location.state.name);
        setSelectedMicrocontroller(location.state.microcontroller);
        setSelectedPeripherals(location.state.peripherals);
      }
    },
    []
  );

  function loadMicrocontrollers(){
    // const service = new DataService();
    // let data = service.getMicrocontrollers();
    // setMicrocontrollers(data);
    showLoader("Loading microcontrollers");
    auth.getAllMicrocontrollers().
    then((response)=>{
      console.log("loaded micros",response)
      setMicrocontrollers(response.data);
      hideLoader();
    }).
    catch((error)=>{
      console.log(error); 
      hideLoader();
    })
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
      if(element.id == elementID){
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
        <div className="flex input-group" style={{overflow: "hidden"}}>
            <span className="center">
              <i className="bi bi-fonts"></i>
            </span>
            <input
                type="text"
                name="name"
                id="device-name"
                className=""
                placeholder="Device name"
                onChange={event => setDeviceName(event.target.value)}
                value={deviceName}
            />
          </div>

         <SelectElementSection title={"Select a microcontroller"} selectedElements={[...selectedMicrocontroller]} removeElement={removeSelectedMicrocontroller} availableElements={[...microcontrollers]} addSelectedElement={addSelectedMicrocontroller} />
                  


         <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={true}>Prev</button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" disabled={(selectedMicrocontroller.length === 0 || deviceName === "") ? true : false }> 
            <Link to="/step-two" state={{name: deviceName, microcontroller: selectedMicrocontroller, peripherals: selectedPeripherals}} className={"button-link text-white " + ((selectedMicrocontroller.length === 0 || deviceName === "") ? " disabled-link" : "")}>Next</Link> 
          </button>


          
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