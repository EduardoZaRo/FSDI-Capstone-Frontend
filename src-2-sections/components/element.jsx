import {useEffect,useState} from "react";
import './element.css';
import {useContext} from 'react';
import StoreContext from '../state/storeContext';

function Element(props){
    const deleteLeftElement = useContext(StoreContext).deleteLeftElement;
    const addRightElement = useContext(StoreContext).addRightElement;
    const deleteRightElement = useContext(StoreContext).deleteRightElement;
    const addLeftElement = useContext(StoreContext).addLeftElement;
    let leftElements = useContext(StoreContext).leftElements;
    useEffect(function(){
        console.log("Elements props",props)
    },[]);

    function handleAddRight(){
        let elementToAdd = {...props.data};
        if(elementToAdd.position === "left"){
            deleteLeftElement(elementToAdd);
            addRightElement(elementToAdd);
        }
    }
    function handleAddLeft(){
        let elementToAdd = {...props.data};
        if(elementToAdd.position === "right"){
            deleteRightElement(elementToAdd);
            addLeftElement(elementToAdd);
        }
    }
    return(
        <div className="element flex-row">
            <h4>{props.data.title}</h4>
            <p onClick={props.data.position === "left" ? handleAddRight : handleAddLeft}>
                {
                    props.data.position === 'left' ? <>+</> : <>-</>
                } 
            </p>
        </div>
    );
}

export default Element;