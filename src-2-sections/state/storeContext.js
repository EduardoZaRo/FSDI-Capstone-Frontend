import {createContext} from  'react';

/**
 * Context
 * is interface, description of the data
 * it promises data
 * does not contain implementation
 */

const StoreContext = createContext({
    leftElements: [],
    rightElements: [],
    addLeftElement: () => {},
    deleteLeftElement: () => {},
    addRightElement: () => {},
    deleteRightElement: () => {},
});

export default StoreContext;