import "./createDevice.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import DataService from "../../services/dataService";
import {Link} from "react-router-dom";
import AddDeviceStepper from "./components/addDeviceStepper";

import SelectElementSection from "./components/selectElementSection";

function CreateDevice(props) {
  const [stepperPage, setStepperPage] = useState(0);
  const [microcontrollers, setMicrocontrollers] = useState([]);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  useEffect(
    function () {
      loadElectronics();
      loadMicrocontrollers();
      console.log("useEffect",electronics, selectedElements,microcontrollers,selectedMicrocontroller );
    },
    [electronics, selectedElements,microcontrollers,selectedMicrocontroller]
  );
  function loadMicrocontrollers(){
    const service = new DataService();
    let data = service.getMicrocontrollers();
    setMicrocontrollers(data);
  }
  function loadElectronics() {
    const service = new DataService();
    let data = service.getElements();
    setElectronics(data);
  }
  function addElectronicComponent(elementID){
    let copy = [...selectedElements];
    let elementToAdd = searchElementByID(electronics, elementID);
    copy.push(elementToAdd);
    setSelectedElements(copy)
  }


  function removeElectronicComponent(selectedIndex){
    let copy = [...selectedElements];
    copy.splice(selectedIndex, 1);
    console.log(copy)
    setSelectedElements(copy)
  }
  function addSelectedMicrocontroller(elementID){
    let copy = [];
    let elementToAdd = searchElementByID(microcontrollers, elementID);
    copy.push(elementToAdd);
    setSelectedMicrocontroller(copy)
  }
  function removeMicrocontroller(){
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
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const incrementStepper = () => {setStepperPage(stepperPage+1);setShow(false)};
  const decrementStepper = () => {setStepperPage(stepperPage-1);setShow(false)};
  return (
    <div className="page createdevice-page flex-column center">
      
      <AddDeviceStepper currentStep={stepperPage}/>
      {stepperPage == 0 ? <SelectElementSection title={"Select a microcontroller"} selectedElements={[...selectedMicrocontroller]} removeElement={removeMicrocontroller} availableElements={[...microcontrollers]} addSelectedElement={addSelectedMicrocontroller} incrementStepper={incrementStepper} toggleShow={toggleShow} show={show}/> : false}
              
      {stepperPage == 1 ? 
        <SelectElementSection title={"Select a peripheral"} selectedElements={[...selectedElements]} removeElement={removeElectronicComponent} availableElements={[...electronics]} addSelectedElement={addElectronicComponent} incrementStepper={incrementStepper} toggleShow={toggleShow} show={show}/>
      : false}

      {stepperPage == 2 ? 
      <div className="step-2 ">
        <p className="text-center">Ready! You only need to follow the next steps to finish</p>
        <ol class="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside flex-column gap-5">
          <li>Create a new Arduino Sketch</li>
          <li>Copy and paste this code in your file:</li>

          <div className="code" id="copy-text-code">
          <button
            id="copy-btn"
            onClick={copyCodeToClipboard}
            class="inline-block w-fit p-2 rounded bg-primary flex justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
          </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui fugit totam, atque eligendi hic expedita, aliquam maxime labore, repellendus omnis quasi neque excepturi delectus? Iste, labore ducimus? Sapiente quae amet ex rerum, ipsam sit. Necessitatibus quis facere nam, deleniti repudiandae accusamus saepe officia labore esse, atque, quisquam non quod suscipit. Magni architecto, aliquid corporis molestiae beatae odit non distinctio libero totam modi laboriosam alias dicta quos nihil, perspiciatis inventore rerum magnam, laborum nemo et nisi. Ea consequuntur provident nemo adipisci sequi! Rerum deleniti autem minima sint qui, natus molestias temporibus soluta possimus? Pariatur possimus beatae vel libero saepe, inventore distinctio quod natus expedita quos doloribus in amet voluptatum ratione. Autem sequi totam, vero doloribus cupiditate, nobis maxime modi dolores repellendus laboriosam voluptatibus quas quasi reprehenderit nostrum maiores nihil provident rem quidem fuga commodi perspiciatis. Eos officia nihil optio perspiciatis ipsum ducimus sed vitae, soluta molestias alias nulla id et molestiae quos deleniti possimus cumque veritatis consequuntur quod. Modi repellat nisi dolore amet quia tempora sed aliquid accusamus, rem alias nostrum architecto obcaecati doloribus, voluptates natus velit delectus! Culpa aliquam ducimus vero? Neque, hic? Accusamus exercitationem suscipit facilis aspernatur fugit ducimus, ipsa excepturi, rerum ab necessitatibus magni maiores voluptatum impedit unde eaque laborum sed dicta fuga eum, eos mollitia quisquam. Molestiae quas ab est esse accusantium consequatur hic fuga doloremque adipisci culpa. Facilis assumenda doloribus explicabo minus quaerat sit fuga nisi, aspernatur deleniti repellendus molestiae optio ipsam vel! Quaerat non, dolorem dolores facere repellat error consequatur, aspernatur ullam aperiam, minus corporis deserunt quis? Libero, a? At ratione, voluptates libero accusantium quo aliquam a quod eaque explicabo expedita! Delectus cum, dicta porro accusamus eos mollitia explicabo commodi placeat quidem praesentium dolore nemo aut laborum? Pariatur veniam ipsum repellendus animi! Et voluptate ipsam pariatur nostrum doloribus non sint beatae neque aperiam numquam quo consequatur rerum inventore consequuntur atque modi, ullam eaque tempora, voluptatum omnis iure dolorem iusto qui odit. Officia molestias sit quaerat expedita amet ratione recusandae nemo dolorum velit eos exercitationem doloremque aliquid, sed, voluptate ipsum modi sapiente praesentium, voluptatibus non inventore nesciunt vero quo accusamus doloribus. Ex tenetur quod eius porro? Ipsum, iste nam. Eum nam iusto expedita tempore similique nisi incidunt quis debitis tempora ab dolores, cumque illum dolore vel, placeat animi inventore molestiae. Accusantium rem voluptates dignissimos minima error, odit sed repellendus reprehenderit. Nam necessitatibus porro magnam reprehenderit natus fugiat, aperiam rem? Cumque maiores, laudantium saepe commodi laborum fuga.
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

      : false}
        <div className="stepper-navigation-btns flex">
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" onClick={decrementStepper} disabled={stepperPage === 0 ? true : false}>Prev</button>
          <button className="generate-code-button flex bg-secondary w-1/6 rounded  m-auto text-white text-center justify-center m-auto disabled:opacity-50 py-2" onClick={incrementStepper} 
          disabled={
            stepperPage > 3 ? true : 
            stepperPage == 0 && selectedMicrocontroller.length == 0 ? true : 
            stepperPage == 1 && selectedElements.length == 0 ? true : 
            false
          }>{stepperPage == 3 ? <Link to="/dashboard">Finish</Link>: "Next"} </button>
        </div>

      </div>
  );
}

export default CreateDevice;