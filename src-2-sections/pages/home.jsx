import axios from 'axios';

import "./home.css";
import {useEffect,useState} from "react";
import {useContext} from 'react';
import StoreContext from '../state/storeContext';
import DataService from "../services/dataService";
import Element from "../components/element";
function Home(props) {
    const [displayLeftElements, setDisplayLeftElements] = useState([]);
    const [displayRightElements, setDisplayRightElements] = useState([]);
    const [code, setCode] = useState("");
    const deleteLeftElement = useContext(StoreContext).deleteLeftElement;
    const addLeftElement = useContext(StoreContext).addLeftElement;
    let leftElements = useContext(StoreContext).leftElements;
    let rightElements = useContext(StoreContext).rightElements;
    useEffect(function(){
        loadElements();
    },[leftElements]);

    function loadElements(){
        setDisplayLeftElements(leftElements);
        setDisplayRightElements(rightElements);
    }
    async function generateFile(){
        const response = await axios.post("http://localhost:8000/generate-code/", JSON.stringify(rightElements));
        console.log(response.data.code);
        setCode(response.data.code);
    }
    return (
        <div className="home">
            <h1>Home</h1>
            <div className="container flex-row">
                <div className="left-elements flex-column">
                    {displayLeftElements.map(p => <Element key={"left-"+p._id} data={p}/>)}
                </div>
                <div className="right-elements flex-column">
                    {displayRightElements.map(p => <Element key={"right-"+p._id} data={p}/>)}
                </div>
            </div>
            {
                rightElements.length ? <a id="generate-code" onClick={generateFile}>Generate code</a> : <></>
            } 
            {
                code !== "" ? <div className="code">{code}</div> : <></>
            }
        </div>
    );
}

export default Home;