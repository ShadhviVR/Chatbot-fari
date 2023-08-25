import React, { createContext, useState } from 'react';

// Create the context
const PredictionContext = createContext();

// Create a provider component
const PredictionProvider = ({ children }) => {

    const [prediction, setPrediction] = useState(null);

    // console.log(prediction, 'from prediction context');

    return (
        <PredictionContext.Provider value={{ prediction, setPrediction }}>
            {children}
        </PredictionContext.Provider>
    );
};

export { PredictionProvider, PredictionContext };