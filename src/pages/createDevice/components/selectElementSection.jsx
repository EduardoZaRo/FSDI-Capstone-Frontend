import { TECollapse, TERipple } from "tw-elements-react";
import "./selectElementSection.css";
import { useEffect, useState } from "react";
import SelectedElement from "../../../components/selectedElement"

function SelectElementSection(props) {
    useEffect(()=>{
        console.log("selecsection",props)
    }, [props.selectedElements])
    return (
        <div className="section step-0 flex-column gap-4">
            <h2 className="text-center">{props.title}{props.name}</h2>
            <div className="section selected-elements flex-column gap-3">
            {
                props.selectedElements.length !== 0
                ?
                props.selectedElements.map((se, index)=>(
                    <SelectedElement key={"selected-" + se._id + "-" + index} id={"selected-" + se._id + "-" + index} data={se} removeElectronicComponent={props.removeElement} selectedIndex={index}/>
                ))

                : 
                <input placeholder="Try selecting an element with +" className={"selectedElectronic bg-secondary-200 rounded flex justify-between w-4/6 m-auto p-3 placeholder:italic placeholder:text-center "} disabled>
                </input>
            }
            </div>
            <div className="section">
            <div className="add-container flex-column">
                <TERipple rippleColor="light">
                <button
                    type="button"
                    className="rounded-full bg-red-700 w-9 h-9 text-4xl pb-2 flex items-center justify-center text-white"
                    onClick={props.toggleShow}
                >
                    +
                </button>
                </TERipple>

                <TECollapse scroll show={props.show} className="no-scrollbar max-w-full max-h-full w-[600px]">

                    <div className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50 h-fit-content w-100 divide-y" >

                    {
                    props.availableElements.map((e) => (
                        <div className="electronic-component flex justify-between h-fit-content py-2">
                            <div className="flex gap-2">
                                <a href={e.infoLink} target="_blank" className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                    </svg>
                                </a>

                                <p className="" key={e._id}>{e.name}{e.title}</p>
                            </div>
                            
                            <button className="add bg-indigo-600 text-white rounded-full flex justify-center items-center content-center w-5 h-5 pb-1" key={e._id * 100} onClick={() => props.addSelectedElement(e._id)}>+</button>
                        </div>
                        
                    ))}
                    </div>
                </TECollapse>

            </div>
            </div>
        </div>
    );
}
export default SelectElementSection;