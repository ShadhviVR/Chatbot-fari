import React, { createContext, useState } from 'react';

// Create the context
const InputTypeContext = createContext();

// Create a provider component
const InputTypeProvider = ({ children }) => {
    const [selectedInputType, setSelectedInputType] = useState(null);

    return (
        <InputTypeContext.Provider value={{ selectedInputType, setSelectedInputType }}>
            {children}
        </InputTypeContext.Provider>
    );
};

export { InputTypeProvider, InputTypeContext };