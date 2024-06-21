import React from 'react';

import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';
import { tipoAlojActions } from '../admin_shared/btnActions';

const TipoAlojamiento = () => {
  return (
    <>
      <TipoAlojamientosForm
        type={'PUT'}
        actions={tipoAlojActions}
      ></TipoAlojamientosForm>
    </>
  );
};

export default TipoAlojamiento;
