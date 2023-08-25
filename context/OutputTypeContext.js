import React, { createContext, useState } from 'react';

// Create the context
const OutputTypeContext = createContext();

// Create a provider component
const OutputTypeProvider = ({ children }) => {

    const [selectedOutputType, setSelectedOutputType] = useState(null);

    // console.log(selectedOutputType, 'from output type context');

    return (
        <OutputTypeContext.Provider value={{ selectedOutputType, setSelectedOutputType }}>
            {children}
        </OutputTypeContext.Provider>
    );
};

export { OutputTypeProvider, OutputTypeContext };