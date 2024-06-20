import React from 'react';

import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';

const TipoAlojamiento = () => {
  return (
    <>
      <TipoAlojamientosForm
        type={'PUT'}
        actions={[
          { actionType: 'PUT', text: 'actualizar', stylesClassName: 'update' },
          { actionType: 'DELETE', text: 'borrar', stylesClassName: 'delete' },
        ]}
      ></TipoAlojamientosForm>
    </>
  );
};

export default TipoAlojamiento;
