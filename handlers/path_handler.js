import { useState } from 'react';

const usePathValue = () => {
    const [selectedElement, setSelectedElement] = useState(null);

    const handleGetPathValue = (pathValue) => {
        setSelectedElement(pathValue);
    };

    return { selectedElement, setSelectedElement, handleGetPathValue };
};

export default usePathValue;