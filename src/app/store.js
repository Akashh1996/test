"use client"

import React from 'react';
const storeContext = React.createContext({});
import todoReducer from './reducers';

const Store = ({ children }) => {
    const initialState = {
        list: [],
    };
    const [state, dispatch] = React.useReducer(todoReducer, initialState);

    return (
        <storeContext.Provider value={{state, dispatch}}>
            {children}
        </storeContext.Provider>
    )
};

export default Store;
export {
    storeContext,
}