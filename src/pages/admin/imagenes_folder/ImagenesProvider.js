import { createContext } from 'react';
import React from 'react';
import { crudImagenes } from '../../../dbEndpoints';
import notify from '../../../utils/toastNotify';
import handleCRUD from '../../../utils/handleCrud';
export const ImagenesContext = createContext();

//WORKING REFACTORING
export const handleSubmit = (e, setter) => {
  e.preventDefault();
  setter((prev) => ({ ...prev, update: false }));
  // const submitterAction =
  //   e.target.nativeEvent.submitter.getAttribute('data-action');
  // console.log(submitterAction);
  const dataId = e.target.getAttribute('data-id');
  const dataType = e.target.getAttribute('data-action-type');
  const buttonAttr = e.nativeEvent.submitter.getAttribute('data-action');
  console.log(dataId);
  console.log(dataType);

  if (!e.target.file.files[0] && buttonAttr !== 'DELETE') {
    notify('No se ha seleccionado una imagen');
    return;
  }
  const {
    file: { name: RutaArchivo },
    idAlojamiento,
  } = Object.fromEntries(new FormData(e.target));
  const requestBody = { idAlojamiento, RutaArchivo };
  const route = dataId
    ? `${crudImagenes[buttonAttr]}${dataId} `
    : crudImagenes[buttonAttr];
  console.log('route', route);
  console.log('attr', buttonAttr);
  console.log('body', requestBody);
  fetch(route, {
    method: buttonAttr,

    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  })
    .then((res) => {
      if (!res.ok) {
        // console.log(res);
        throw new Error(res.statusText);
      }
      setter((prev) => ({ ...prev, update: true }));
      return res.json();
    })
    .then((res) => notify(res.message, 'success'))
    .catch((err) => {
      notify(err.message || 'error cargando imagen');
    })
    .finally(e.target.reset());
};
//WORKING REFACTORING
const ImagenesProvider = ({ children }) => {
  return (
    <ImagenesContext.Provider value={{ handleSubmit: handleSubmit }}>
      {children}
    </ImagenesContext.Provider>
  );
};

export default ImagenesProvider;
