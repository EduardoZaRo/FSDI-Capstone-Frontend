import "./createDevice.css";
import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import {Link} from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";
import { useAuthContext } from "../../state/authContext";
import SelectElementSection from "./components/selectElementSection";
import ShowGeneratedCode from "./components/showGeneratedCode";
function CreateDevice(props) {
  const [stepperPage, setStepperPage] = useState(0);
  const [code, setCode] = useState('');
  const [microcontrollers, setMicrocontrollers] = useState([]);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [peripherals, setPeripherals] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const auth = useAuthContext();

  useEffect(
    function () {
      loadPeripherals();
      loadMicrocontrollers();

      if(stepperPage === 2){
        console.log("Created device: ", selectedMicrocontroller, selectedPeripherals)        
      }
    },
    [stepperPage, peripherals, selectedPeripherals,microcontrollers,selectedMicrocontroller]
  );

  function loadMicrocontrollers(){
    const service = new DataService();
    let data = service.getMicrocontrollers();
    setMicrocontrollers(data);
  }
  function loadPeripherals() {
    const service = new DataService();
    let data = service.getElements();
    setPeripherals(data);
  }
  function addPeripheral(elementID){

    let copy = [...selectedPeripherals];
    let elementToAdd = searchElementByID(peripherals, elementID);
    copy.push(elementToAdd);
    if(isPeripheralAllowed()){
      setSelectedPeripherals(copy)
    }
    else{
      alert("You cannot add more peripherals because your microcontroller doesnt have more pins")
    }
  }


  function removePeripheral(selectedIndex){
    let copy = [...selectedPeripherals];
    copy.splice(selectedIndex, 1);
    console.log(copy)
    setSelectedPeripherals(copy)
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
  function xd(){
    auth.getNewDeviceCode({
      'microcontroller': selectedMicrocontroller[0],
      'peripherals': selectedPeripherals
    }).then((response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    })
  }

  function copyCodeToClipboard(){
    let txtCode = document.getElementById("copy-text-code");
    console.log(txtCode.innerHTML)
    navigator.clipboard.writeText(txtCode.innerText);
  }

  function isPeripheralAllowed(){
    let microAvailablePins = selectedMicrocontroller[0].availablePins;
    let neededPins = 0;
    selectedPeripherals.forEach((se)=>{
      neededPins += se.neededPins
    })
    console.log(neededPins,microAvailablePins)
    return neededPins > microAvailablePins ? false : true;
  }
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const incrementStepper = () => {setStepperPage(stepperPage+1);setShow(false)};
  const decrementStepper = () => {setStepperPage(stepperPage-1);setShow(false)};
  return (
    <div className="page createdevice-page flex-column center">
      <div className="step-container">
        <AddDeviceStepper currentStep={stepperPage}/>

        {stepperPage == 0 ? <SelectElementSection title={"Select a microcontroller"} selectedElements={[...selectedMicrocontroller]} removeElement={removeSelectedMicrocontroller} availableElements={[...microcontrollers]} addSelectedElement={addSelectedMicrocontroller} incrementStepper={incrementStepper} toggleShow={toggleShow} show={show}/> : false}
                
        {stepperPage == 1 ? 
          <SelectElementSection title={"Select a peripheral"} selectedElements={[...selectedPeripherals]} removeElement={removePeripheral} availableElements={[...peripherals]} addSelectedElement={addPeripheral} incrementStepper={incrementStepper} toggleShow={toggleShow} show={show}/>
        : false}
      
`      {stepperPage == 2 ? 
      <ShowGeneratedCode selectedMicrocontroller={selectedMicrocontroller} selectedPeripherals={selectedPeripherals}/>
      : false}
      {stepperPage == 3 ? 
      <div className="step-3">
        <p className="text-center">Process finished, now you can go to your device dashboard to see your new device</p>
      </div>

      : false}`
      
          <div className="stepper-navigation-btns flex">
            <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" onClick={decrementStepper} disabled={stepperPage === 0 ? true : false}>Prev</button>
            <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" onClick={incrementStepper} 
            disabled={
              stepperPage > 3 ? true : 
              stepperPage == 0 && selectedMicrocontroller.length == 0 ? true : 
              stepperPage == 1 && selectedPeripherals.length == 0 ? true : 
              false
            }>{stepperPage == 3 ? <Link to="/dashboard">Finish</Link>: "Next"} </button>
          </div>
        </div>
        <button onClick={xd}>XD</button>
      </div>
      
  );
}

export default CreateDevice;


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