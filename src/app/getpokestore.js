"use client"

import React from 'react';
const storeContext = React.createContext({});
import { getpokemonReducer } from './reducers';

const PokeStore = ({ children }) => {
    const initialState = {
        results: [],
    };
    const [state, dispatch] = React.useReducer(getpokemonReducer, initialState);

    return (
        <storeContext.Provider value={[state, dispatch]}>
            {children}
        </storeContext.Provider>
    )
};

export default PokeStore;
export {
    storeContext,
}