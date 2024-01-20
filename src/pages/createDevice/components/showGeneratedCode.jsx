import './addDeviceStepper.css'
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../../../state/authContext";
import axios from 'axios';
import Highlight from 'react-highlight'
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import LoadingScreen from '../../../components/loadingScreen';
import {useLoader} from '../../../state/loaderContext';
function ShowGeneratedCode(props) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [neededLibraries, setNeededLibraries] = useState([]);
  const {showLoader, hideLoader} = useLoader();
  const auth = useAuthContext();

  useEffect(()=>{
    console.log("generate code props", props)
    if(props.selectedMicrocontroller.length == 0){
      return;
    }
    console.log(props)
    showLoader("Generatig code ...");
    auth.getNewDeviceCode({
        'name': props.deviceName,
        'microcontroller': props.selectedMicrocontroller[0],
        'peripherals': props.selectedPeripherals
    }).then((response)=>{
        let auxCode = JSON.parse(response.data).code;
        setCode(auxCode);
        let auxLibraries = auxCode.match(/[A-Za-z0-9]+\.h/g);
        setNeededLibraries(auxLibraries);
        hljs.highlightAll();
        hideLoader();
    }).catch((error)=>{
        console.log(error)
        hideLoader();
    })
  }, [props.selectedMicrocontroller.length])
  function copyCodeToClipboard(){
    navigator.clipboard.writeText(code);
  }
  return (
      // loading? <LoadingScreen/> :
      <div className="step-2 w-full">
      <h2 className="text-center">Ready! You only need to follow the next steps to finish</h2>
      <ol className="flex-column m-auto w-full space-y-1 list-decimal list-inside flex-column gap-5">
        <li>Create a new Arduino Sketch</li>
        <li>Copy and paste this code in your file:</li>

        <div className="code" id="copy-text-code">
          <div className="copy-btn-container" style={{position: "sticky", display: "flex", justifyContent: "flex-end", width: "100%", top: "0"}}>
            <button
              id="copy-btn"
              onClick={copyCodeToClipboard}
              className="inline-block w-fit p-2 rounded bg-primary flex justify-center text-white"
              >
                <i className="bi bi-copy"></i>
            </button>
          </div>

          <Highlight className='language-arduino'>
            {code}
          </Highlight>
        </div>
        <li>Check if you have all the needed libraries</li>
        <div className="code">
          {
            neededLibraries.map(library => <code key={library}>{library}<br/></code>)
          }

          If you miss someone, install it via:
        </div>
        <ul className="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
          <li>Sketch &gt; Include Library &gt; Manage Libraries</li>
          <img src="manage-libraries.png" alt="" />
          <p>This step can take a while</p>
          <li>Search the library and install it</li>
          <img src="search-library.png" alt="" />
        </ul>
        <li>Select your board in ardino</li>
        <ul className="flex-column m-auto w-4/6 space-y-1 list-decimal list-inside">
          <li>Tools &gt; Board &gt; Board family &gt; Specific board</li>
          <img src="select-board.png" alt="" />
          <p>Make sure your COM port is recognized by arduino</p>
          <img src="check-com.png" alt="" />
        </ul>
      </ol>
    </div>
  );
}

export default ShowGeneratedCode;