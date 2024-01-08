import axios from "axios";
import { TECollapse, TERipple } from "tw-elements-react";
import styles from '../index.css'
import "./selectedElement.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import StoreContext from "../state/authContext";
import DataService from "../services/dataService";

function SelectedElement(props) {
  return (
    <div className={"selectedElectronic bg-blue-300 rounded flex justify-between w-full m-auto text-white p-3"}>
        <p className="flex items-center text-black">{props.data.title} {props.data.name} - {props.data._id}</p>
        <button className="bg-red-500 px-2 rounded" onClick={()=>props.removeElectronicComponent(props.selectedIndex)}>Delete</button>
    </div>
  );
}

export default SelectedElement;
