import React, { createContext, useState } from 'react';

// Create the context
const LinkContext = createContext();

// Create a provider component
const LinkProvider = ({ children }) => {
    const [linkSource, setLinkSource] = useState('');

    return (
        <LinkContext.Provider value={{ linkSource, setLinkSource }}>
            {children}
        </LinkContext.Provider>
    );
};

export { LinkProvider, LinkContext };