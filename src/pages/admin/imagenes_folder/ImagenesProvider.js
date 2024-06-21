import { createContext } from 'react';
import React from 'react';
const ImagenesContext = createContext();

const ImagenesProvider = ({ children }) => {
  return (
    <ImagenesProvider.Provider value={{ data: 2 }}>
      {children}
    </ImagenesProvider.Provider>
  );
};

export default ImagenesProvider;
