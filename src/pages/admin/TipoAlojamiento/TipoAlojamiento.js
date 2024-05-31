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
        type={'update'}
        actions={[
          { actionType: 'update', text: 'actualizar' },
          { actionType: 'delete', text: 'borrar' },
        ]}
      ></TipoAlojamientosForm>
    </>
  );
};

export default TipoAlojamiento;
