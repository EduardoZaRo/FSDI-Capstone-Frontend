import StoreContext from './storeContext';
import {useState} from 'react';
import DataService from "../services/dataService";
function GlobalState(props){
    const [leftElements, setLeftElements] = useState(new DataService().getElements());
    const [rightElements, setRightElements] = useState([])

    function addLeftElement(element){
        let copy = [...leftElements];
        element.position = "left";
        copy.push(element);
        setLeftElements(copy);
        
    }
    function deleteLeftElement(element){
        let copy = [...leftElements];
        copy = copy.filter(item => item._id !== element._id);
        setLeftElements(copy);
    }
    function addRightElement(element){
        let copy = [...rightElements];
        element.position = "right";
        copy.push(element);
        setRightElements(copy);
    }
    function deleteRightElement(element){
        let copy = [...rightElements];
        copy = copy.filter(item => item._id !== element._id)
        setRightElements(copy);
    }
    return (
        <StoreContext.Provider value={{
            leftElements: leftElements,
            rightElements: rightElements,
            addLeftElement: addLeftElement,
            deleteLeftElement: deleteLeftElement,
            addRightElement: addRightElement,
            deleteRightElement: deleteRightElement,
        }}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default GlobalState;