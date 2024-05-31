import React, { useState } from 'react';
import formStyles from './tipoAlojamientosForm.module.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { BaseURL, tiposDeAlojamiento } from '../../../dbEndpoints';
const TipoAlojamientosForm = (props) => {
  console.log('in');
  const location = useLocation();
  const tipo = location?.state?.el ?? null;
  const { formActionsContainer } = formStyles;
  // console.log('render');
  const createFunc = async () => {
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
  };

  const [tipoAlojamientosState, setTipoAlojamientosState] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  });

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
        {/* <button className='admin-btn'>agregar</button> */}
        <div className={`${formActionsContainer}`}>
          {props.actions.map(({ actionType, text }) => (
            <button
              className={`btn-${actionType}`}
              data-action={actionType}
              key={actionType}
              style={{ marginRight: 5 }}
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
