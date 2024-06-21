import { createContext } from 'react';
import React from 'react';
import { crudImagenes } from '../../../dbEndpoints';
import notify from '../../../utils/toastNotify';
export const ImagenesContext = createContext();
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('route', e.target.getAttribute('data-route'));
  if (!e.target.file) {
    return;
  }
  const {
    file: { name: RutaArchivo },
    idAlojamiento,
  } = Object.fromEntries(new FormData(e.target));
  fetch(crudImagenes.POST, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify({ idAlojamiento, RutaArchivo }), // body data type must match "Content-Type" header
  })
    .then((res) => {
      if (!res.ok) {
        // console.log(res);
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => notify(res.message, 'success'))
    .catch((err) => {
      notify(err.message || 'error cargando imagen');
    });
};
const ImagenesProvider = ({ children }) => {
  return (
    <ImagenesContext.Provider value={{ handleSubmit: handleSubmit, data: 1 }}>
      {children}
    </ImagenesContext.Provider>
  );
};

export default ImagenesProvider;
