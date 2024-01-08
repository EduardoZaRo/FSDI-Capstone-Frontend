import { TECollapse, TERipple } from "tw-elements-react";
import "./selectElementSection.css";
import { useEffect, useState } from "react";
import SelectedElement from "../../../components/selectedElement"

function SelectElementSection(props) {
    useEffect(()=>{
        console.log("selecsection",props)
    }, [props.selectedElements])
    return (
        <div className="select-elemenet-section-component section step-0 flex-column gap-4">
            <h2 className="text-center">{props.title}{props.name}</h2>
            <div className="section selected-elements flex-column gap-3">
            {
                props.selectedElements.length !== 0
                ?
                props.selectedElements.map((se, index)=>(
                    <SelectedElement key={se.name+se._id+index} id={"selected-" + se._id + "-" + index} data={se} removeElectronicComponent={props.removeElement} selectedIndex={index}/>
                ))

                : 
                <input placeholder="Try selecting an element with +" className={"selectedElectronic bg-secondary-200 rounded flex justify-between w-full m-auto p-3 placeholder:italic placeholder:text-center "} disabled>
                </input>
            }
            </div>
            <div className="section">
            <div className="add-container flex-column">
                <TERipple rippleColor="light">
                <button
                    type="button"
                    className="center big-circle-add-btn"
                    onClick={props.toggleShow}
                >
                    +
                </button>
                </TERipple>

                <TECollapse scroll show={props.show} className="no-scrollbar max-w-full max-h-full w-[600px]">

                    <div className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50 h-fit-content w-100 divide-y" >

                    {
                    props.availableElements.map((e) => (
                        <div key={e._id+e.name} className="electronic-component flex justify-between items-center h-fit-content py-2">
                            <div className="flex gap-2">
                                <a href={e.infoLink} target="_blank" className="flex items-center">
                                    <i className="bi bi-info-circle"></i>
                                </a>

                                <p className="m-auto" key={e._id}>{e.name}{e.title}</p>
                            </div>
                            
                            <button className="center small-circle-add-btn" key={e._id * 100} onClick={() => props.addSelectedElement(e._id)}>+</button>
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