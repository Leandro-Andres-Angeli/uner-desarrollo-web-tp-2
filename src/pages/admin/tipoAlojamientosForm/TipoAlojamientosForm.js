import React, { useState } from 'react';
import formStyles from './tipoAlojamientosForm.module.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
import { crudTipoAlojamientosEndpoints } from '../../../dbEndpoints';

import crudOperations from '../../../utils/crudOperations';
import handleCRUD from '../../../utils/handleCrud';
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

    const {
      Descripcion: { name, value },
    } = e.target;
    console.log({ [name]: value });
    const endpoint =
      tipo !== null
        ? `${crudTipoAlojamientosEndpoints[action]}/${tipo.id}`
        : crudTipoAlojamientosEndpoints[action];
    await handleCRUD(
      endpoint,
      crudOperations[action]({ [name]: value }),
      setCrudRes
    );
    if (!crudRes.error) {
      props?.setTipoAlojamientos &&
        props?.setTipoAlojamientos((prev) => ({ ...prev, update: true }));
    }
    if (Boolean(location.state)) {
      history.goBack(-1);
    }
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

        <div className={`${formActionsContainer}`}>
          {props.actions.map(({ actionType, text, stylesClassName }) => (
            <button
              className={`btn-${stylesClassName}`}
              data-action={actionType}
              key={actionType}
              style={{ marginRight: 5 }}
              type='submit'
            >
              {text}
            </button>
          ))}
        </div>
      </fieldset>
      {/*{JSON.stringify(crudRes)*/}
    </form>
  );
};

export default TipoAlojamientosForm;
