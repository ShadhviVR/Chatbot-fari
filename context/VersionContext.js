import React, { createContext, useState } from 'react';

// Create the context
const VersionContext = createContext();

// Create a provider component
const VersionProvider = ({ children }) => {
    const [selectedVersion, setSelectedVersion] = useState('');

    return (
        <VersionContext.Provider value={{ selectedVersion, setSelectedVersion }}>
            {children}
        </VersionContext.Provider>
    );
};

export { VersionProvider, VersionContext };