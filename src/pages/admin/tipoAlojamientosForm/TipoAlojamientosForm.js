import React, { useState } from 'react';
import formStyles from './tipoAlojamientosForm.module.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
import { crudTipoAlojamientosEndpoints } from '../../../dbEndpoints';
import crudOperations from '../../../utils/crudOperations';
import handleCRUD from '../../../utils/handleCrud';
import notify from '../../../utils/toastNotify';
import ButtonsWrapper, { AdminFormBtn } from './../admin_shared/ButtonsWrapper';
import {
  tipoAlojamientosNew,
  tipoAlojamientosUpdate,
} from '../admin_shared/btnActions';

const TipoAlojamientosForm = (props) => {
  // console.log('in');

  const location = useLocation();
  const history = useHistory();
  const tipo = location?.state?.el ?? null;
  const { formActionsContainer } = formStyles;

  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
  };
  const [crudRes, setCrudRes] = useState(intialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute('data-action');

    if (action === 'CANCEL') {
      history.push(
        location.pathname.slice(0, location.pathname.lastIndexOf('/'))
      );
      return;
    }

    const {
      Descripcion: { name, value },
    } = e.target;

    const endpoint =
      tipo !== null
        ? `${crudTipoAlojamientosEndpoints[action]}/${tipo.id}`
        : crudTipoAlojamientosEndpoints[action];

    handleCRUD(
      endpoint,
      crudOperations[action]({ [name]: value }),
      setCrudRes
    ).then((data) => {
      if (!crudRes.error) {
        props?.setTipoAlojamientos &&
          props?.setTipoAlojamientos((prev) => ({ ...prev, update: true }));
        if (data?.message) notify(data.message, 'success');
        else notify('ocurrió un error', 'error');
      }
      if (Boolean(location.state)) {
        history.push(
          location.pathname.slice(0, location.pathname.lastIndexOf('/'))
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} data-id={tipo?.idTipoAlojamiento}>
      <fieldset>
        <legend>tipo de alojamientos</legend>
        <div className='form-control'>
          <label>tipo de alojamiento</label>
          <input
            type='text'
            placeholder='ej : depto'
            name='Descripcion'
            defaultValue={tipo?.desc}
            required
          />
        </div>

        <ButtonsWrapper>
          {tipo !== null
            ? tipoAlojamientosUpdate.map(
                ({ actionType, text, stylesClassName }) => (
                  <AdminFormBtn
                    key={actionType}
                    {...{ actionType, text, stylesClassName }}
                  ></AdminFormBtn>
                )
              )
            : tipoAlojamientosNew.map(
                ({ actionType, text, stylesClassName, type }) => (
                  <AdminFormBtn
                    key={actionType}
                    {...{ actionType, text, stylesClassName, type }}
                  ></AdminFormBtn>
                )
              )}
        </ButtonsWrapper>
      </fieldset>
    </form>
  );
};

export default TipoAlojamientosForm;
