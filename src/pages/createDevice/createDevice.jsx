import "./createDevice.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import {Link} from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";

import SelectElementSection from "./components/selectElementSection";

function CreateDevice(props) {
  const [stepperPage, setStepperPage] = useState(0);
  const [code, setCode] = useState('');
  const [microcontrollers, setMicrocontrollers] = useState([]);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [peripherals, setPeripherals] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
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
      <div className="step-2 w-full">
        <h2 className="text-center">Ready! You only need to follow the next steps to finish</h2>
        <ol class="flex-column m-auto w-full space-y-1 list-decimal list-inside flex-column gap-5">
          <li>Create a new Arduino Sketch</li>
          <li>Copy and paste this code in your file:</li>

          <div className="code" id="copy-text-code">
          <button
            id="copy-btn"
            onClick={copyCodeToClipboard}
            class="inline-block w-fit p-2 rounded bg-primary flex justify-center text-white">
              <i className="bi bi-copy"></i>
          </button>
            <p>
              {code}
            </p>

          </div>
          <li>Check if you have all the needed libraries</li>
          <div className="code">
            //All the need libraries

            If you miss someone, install it via:
          </div>
          <ul class="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
            <li>Sketch > Include Library > Manage Libraries</li>
            <img src="manage-libraries.png" alt="" />
            <p>This step can take a while</p>
            <li>Search the library and install it</li>
            <img src="search-library.png" alt="" />
          </ul>
          <li>Select your board in ardino</li>
          <ul class="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
            <li>Tools > Board > Board family > Specific board</li>
            <img src="select-board.png" alt="" />
            <p>Make sure your COM port is recognized by arduino</p>
            <img src="check-com.png" alt="" />
          </ul>
        </ol>
      </div>
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
      </div>
  );
}

export default CreateDevice;