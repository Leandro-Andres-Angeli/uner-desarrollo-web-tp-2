import React, { useState } from 'react';
import formStyles from './tipoAlojamientosForm.module.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {
  BaseURL,
  crudTipoAlojamientosEndpoints,
  tiposDeAlojamiento,
} from '../../../dbEndpoints';
import UseCrud from '../../../hooks/UseCrud';
import crudOperations from '../../../hooks/crudOperations';
const TipoAlojamientosForm = (props) => {
  console.log('in');

  const location = useLocation();
  const tipo = location?.state?.el ?? null;
  const { formActionsContainer } = formStyles;
  // console.log('render');
  /*  const createFunc = async () => {
    try {
      const res = await fetch(`${BaseURL}${tiposDeAlojamiento}`);
      console.log(res);

      if (!res.ok) {
        return;
      }
    } catch (err) {
      const { status } = err;
    } finally {
      console.log('finally');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    if (tipo) {
      return;
    }
    console.log('ADD');
  }; */

  /*   const [tipoAlojamientosState, setTipoAlojamientosState] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  }); */
  const [crudRes, setCrudRes] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  });
  const handleCRUD = async (URL, method) => {
    try {
      const res = await fetch(URL, method);

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return;
      }
    } catch (err) {
      const { status } = err;
    } finally {
      console.log('finally');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute('data-action');
    console.log(action);
    console.log(props);
    console.log('tipo', tipo);
    const {
      Descripcion: { name, value },
    } = e.target;
    console.log({ [name]: value });
    const endpoint =
      tipo !== null
        ? `${crudTipoAlojamientosEndpoints[action]}/${tipo.idTipoAlojamiento}`
        : crudTipoAlojamientosEndpoints[action];
    await handleCRUD(endpoint, crudOperations[action]({ [name]: value }));
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
            defaultValue={tipo?.Descripcion}
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
    </form>
  );
};

export default TipoAlojamientosForm;
