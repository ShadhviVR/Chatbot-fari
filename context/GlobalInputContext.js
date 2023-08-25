import React, { createContext, useState } from 'react';

// Create the context
const GlobalInputContext = createContext();

// Create a provider component
const GlobalInputProvider = ({ children }) => {

    const [globalInput, setGlobalInput] = useState({});

    //console.log(globalInput, 'from global input context');

    return (
        <GlobalInputContext.Provider value={{ globalInput, setGlobalInput }}>
            {children}
        </GlobalInputContext.Provider>
    );
};

export { GlobalInputProvider, GlobalInputContext };