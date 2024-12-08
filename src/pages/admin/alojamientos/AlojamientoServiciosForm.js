import React, { useEffect, useState } from 'react';
import {
  crudAlojamientoServiciosEndpoints,
  crudServiciosEndpoints,
} from '../../../dbEndpointsServicios';
import { crudAlojamientosEndpoints } from '../../../dbEndpointsAlojamiento';
import crudOperations from '../../../utils/crudOperations';
import handleCRUD from '../../../utils/handleCrud';
import './AlojamientoForm.css';
import LoadingIcon from '../../../components/LoadingIcon.js';

const AlojamientoServiciosForm = ({
  servicios,
  serviciosDelAlojamiento,
  serviciosAsignados,
  setServiciosAsignados,
  editando,
}) => {
  const handleChange = (servicio, checked) => {
    console.log(servicio, checked);
    if (checked) {
      setServiciosAsignados((prev) => [...prev, servicio]);
    } else {
      setServiciosAsignados([
        ...serviciosAsignados.filter((servicioAsignado) => {
          return servicioAsignado.idServicio !== servicio.idServicio;
        }),
      ]);
    }
  };

  useEffect(() => {
    if (editando) {
      if (serviciosDelAlojamiento.done) {
        setServiciosAsignados([...serviciosDelAlojamiento.data]);
      }
    } else {
      setServiciosAsignados([]);
    }
  }, [editando, serviciosDelAlojamiento]);

  return (
    <fieldset>
      <legend>Servicios</legend>
      <div className='form-grid'>
        {editando ? (
          serviciosDelAlojamiento.loading ? (
            <LoadingIcon></LoadingIcon>
          ) : (
            servicios.data.map((servicio, index) => {
              return (
                <div key={index} className='form-grid-checkbox'>
                  <input
                    type='checkbox'
                    id={index + '-checkbox'}
                    name={servicio.Nombre}
                    checked={serviciosAsignados.some((alojServicio) => {
                      return servicio.idServicio === alojServicio.idServicio;
                    })}
                    onChange={(e) => handleChange(servicio, e.target.checked)}
                  />
                  <label htmlFor={index + '-checkbox'}>{servicio.Nombre}</label>
                </div>
              );
            })
          )
        ) : (
          <>
            {servicios.data.map((servicio, index) => {
              return (
                <div key={index} className='form-grid-checkbox'>
                  <input
                    type='checkbox'
                    id={index + '-checkbox'}
                    name={servicio.Nombre}
                    checked={serviciosAsignados.some((alojServicio) => {
                      return servicio.idServicio === alojServicio.idServicio;
                    })}
                    onChange={(e) => handleChange(servicio, e.target.checked)}
                  />
                  <label htmlFor={index + '-checkbox'}>{servicio.Nombre}</label>
                </div>
              );
            })}
          </>
        )}
      </div>
    </fieldset>
  );
};

export default AlojamientoServiciosForm;
