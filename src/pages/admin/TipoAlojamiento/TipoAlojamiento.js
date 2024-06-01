import React from 'react';
import {
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';

const TipoAlojamiento = () => {
  return (
    <>
      <TipoAlojamientosForm
        type={'PUT'}
        actions={[
          { actionType: 'PUT', text: 'actualizar' },
          { actionType: 'DELETE', text: 'borrar' },
        ]}
      ></TipoAlojamientosForm>
    </>
  );
};

export default TipoAlojamiento;
