import React, { useEffect, useState } from 'react';
import ImagenForm from './imagenFormComponents/ImagenForm';

import imgValidate from '../../../utils/imgValidate';
import notify from '../../../utils/toastNotify';
import { crudAlojamientosEndpoints } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';
import intialState from '../../../utils/initialState';

const Imagen = () => {
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
