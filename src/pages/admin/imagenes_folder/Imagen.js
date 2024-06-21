import React, { useEffect, useState } from 'react';
import ImagenForm from './imagenFormComponents/ImagenForm';

import imgValidate from '../../../utils/imgValidate';
import notify from '../../../utils/toastNotify';
import { crudAlojamientosEndpoints } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';
import intialState from '../../../utils/initialState';

const Imagen = () => {
  console.log('img render');
  const [errors, setErrors] = useState({ error: 'empty' });
  const [imagePreview, setImagePreview] = useState({
    route: 'broken-image.png',
  });
  const [alojamientos, setAlojamientos] = useState(intialState);

  useEffect(() => {
    handleCRUD(crudAlojamientosEndpoints.readAll, undefined, setAlojamientos)
      .then((data) => {
        return data;
      })

      .catch((err) => notify(err.message || 'error cargando data'));
  }, []);

  /*   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('route', e.target.getAttribute('data-route'));
    if (!e.target.file) {
      return;
    }
    console.log(e.target.idAlojamiento);
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
          console.log(res);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => notify(res.message, 'success'))
      .catch((err) => {
        notify(err.message || 'error cargando imagen');
      });
  }; */

  const handleInputCapture = ({ target }) => {
    const [file] = target?.files;
    console.log(file);
    const { type } = file;
    if (!imgValidate(type)) {
      setErrors({ error: 'debe cargar archivos de tipo imagen' });
      notify('debe cargar archivos de tipo imagen');
      return;
    }
    setImagePreview({
      type,
      route: `${file.name}`,
    });
    setErrors({});
  };
  return (
    <div>
      <ImagenForm
        {...{
          setErrors,
          setImagePreview,
          imagePreview,

          handleInputCapture,
          alojamientos,
          errors,
        }}
      ></ImagenForm>
    </div>
  );
};

export default Imagen;
