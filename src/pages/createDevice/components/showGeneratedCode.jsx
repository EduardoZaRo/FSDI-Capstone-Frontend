import './addDeviceStepper.css'
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../../../state/authContext";
import axios from 'axios';
function ShowGeneratedCode(props) {
  const [code, setCode] = useState('');
  let xd = "";
  const auth = useAuthContext();
  const fetchData = useCallback(async () => {
    const response = await auth.getNewDeviceCode({
        'microcontroller': props.selectedMicrocontroller,
        'peripherals': props.selectedPeripherals
    });
    console.log(response)
    setCode(response);
  });

  
  useEffect(()=>{
    // axios.post("/generate-code/", {
    //       'microcontroller': props.selectedMicrocontroller,
    //       'peripherals': props.selectedPeripherals
    //   }).then((response)=>{setCode(JSON.parse(response.data).code);}).catch(()=>{});
    auth.getNewDeviceCode({
        'microcontroller': props.selectedMicrocontroller,
        'peripherals': props.selectedPeripherals
    }).then((response)=>{
          console.log(response)
          setCode(JSON.parse(response.data).code)
      }).catch((error)=>{
          console.log(error)
      })
    // setCode(responseCode);
    // .then((response)=>{
    //     console.log(response)
    //     setCode(response.data)
    // }).catch((error)=>{
    //     console.log(error)
    // })
  }, [])
  function copyCodeToClipboard(){
    let txtCode = document.getElementById("copy-text-code");
    console.log(txtCode.innerHTML)
    navigator.clipboard.writeText(txtCode.innerText);
  }
  return (
      <div className="step-2 w-full">
      <h2 className="text-center">Ready! You only need to follow the next steps to finish</h2>
      <ol className="flex-column m-auto w-full space-y-1 list-decimal list-inside flex-column gap-5">
        <li>Create a new Arduino Sketch</li>
        <li>Copy and paste this code in your file:</li>

        <div className="code" id="copy-text-code">
        <button
          id="copy-btn"
          onClick={copyCodeToClipboard}
          className="inline-block w-fit p-2 rounded bg-primary flex justify-center text-white">
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
        <ul className="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
          <li>Sketch > Include Library > Manage Libraries</li>
          <img src="manage-libraries.png" alt="" />
          <p>This step can take a while</p>
          <li>Search the library and install it</li>
          <img src="search-library.png" alt="" />
        </ul>
        <li>Select your board in ardino</li>
        <ul className="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
          <li>Tools > Board > Board family > Specific board</li>
          <img src="select-board.png" alt="" />
          <p>Make sure your COM port is recognized by arduino</p>
          <img src="check-com.png" alt="" />
        </ul>
      </ol>
    </div>
  );
}

export default ShowGeneratedCode;