import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
import { crudAlojamientoServiciosEndpoints } from '../../../dbEndpointsServicios';
import { crudAlojamientosEndpoints } from '../../../dbEndpointsAlojamiento';
import crudOperations from '../../../utils/crudOperations';
import handleCRUD from '../../../utils/handleCrud';
import ButtonsWrapper, { AdminFormBtn } from './../admin_shared/ButtonsWrapper';
import {
  alojamientosNew,
  alojamientosUpdate,
} from '../admin_shared/btnActions';
import './AlojamientoForm.css';
import notify from '../../../utils/toastNotify';
import AlojamientoServiciosForm from './AlojamientoServiciosForm';

const AlojamientoForm = (props) => {
  const location = useLocation();
  const history = useHistory();
  const locationState = Boolean(location?.state)
    ? location.state.el.Titulo
    : null;
  const initialAlojamiento = {
    Titulo: '',
    Descripcion: '',
    Latitud: 0,
    Longitud: 0,
    idTipoAlojamiento: null,
    Estado: 'Disponible',
    PrecioPorDia: 0,
    CantidadDormitorios: 0,
    CantidadBanios: 0,
  };
  const [alojamiento, setAlojamiento] = useState(initialAlojamiento);

  const initialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
  };
  const [alojamientoServicios, setAlojamientoServicios] =
    useState(initialState);
  const [crudRes, setCrudRes] = useState(initialState);
  const [serviciosDelAlojamiento, setServiciosDelAlojamiento] =
    useState(initialState);
  const [serviciosAsignados, setServiciosAsignados] = useState([]);

  useEffect(() => {
    setAlojamiento(location?.state?.el ?? initialAlojamiento);
    props.setEditando(location?.state?.el);
    if (location?.state?.el) {
      // window.scrollTo({
      //   top: 100,
      //   behavior: 'smooth',
      // });

      cargarServiciosAlojamiento();
    } else {
      setServiciosDelAlojamiento(initialState);
    }
  }, [location]);

  const cargarServiciosAlojamiento = async () => {
    handleCRUD(
      `${crudAlojamientoServiciosEndpoints.readAll}`,
      undefined,
      setAlojamientoServicios
    );
  };

  useEffect(() => {
    if (alojamientoServicios.done) {
      setServiciosDelAlojamiento({
        ...alojamientoServicios,
        loading: false,
        data: alojamientoServicios.data.filter((alojServicio) => {
          return alojServicio.idAlojamiento === alojamiento.idAlojamiento;
        }),
      });
    }
  }, [alojamientoServicios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute('data-action');
    if (action === 'CANCEL') {
      setAlojamiento(initialAlojamiento);
      history.push(location.pathname.split('/').slice(0, -1).join('/'));
      return;
    }

    let endpoint = '';
    if (action === 'POST') {
      endpoint = crudAlojamientosEndpoints[action];
    } else {
      endpoint = `${crudAlojamientosEndpoints[action]}/${alojamiento.idAlojamiento}`;
    }

    if (action === 'DELETE') {
      serviciosDelAlojamiento.data.map((servicioAloj) => {
        const servicioAlojamientoEndpoint = `${crudAlojamientoServiciosEndpoints[action]}/${servicioAloj.idAlojamientoServicio}`;

        handleCRUD(
          servicioAlojamientoEndpoint,
          crudOperations[action](servicioAloj),
          setCrudRes
        )
          .then((data) => {})
          .catch((err) => {
            notify(err.message || 'error eliminando servicio alojamiento');
          });
      });
    }

    handleCRUD(endpoint, crudOperations[action](alojamiento), setCrudRes).then(
      async (data) => {
        if (!crudRes.error) {
          props?.setAlojamientos &&
            props?.setAlojamientos((prev) => ({ ...prev, update: true }));
          if (action !== 'DELETE') {
            await updateAlojamientoServicios(
              data.id || alojamiento.idAlojamiento
            );
          }
          if (data?.message) notify(data.message, 'success');
          else notify('ocurrió un error', 'error');

          setAlojamiento(initialAlojamiento);
          setServiciosAsignados([]);
        }

        if (Boolean(location.state)) {
          history.push(location.pathname.split('/').slice(0, -1).join('/'));
        }
      }
    );
  };

  const updateAlojamientoServicios = async (idAlojamiento) => {
    // agregar servicio alojamiento
    serviciosAsignados.map((servicioAsignado) => {
      if (
        !serviciosDelAlojamiento.data.some((servicioAloj) => {
          return servicioAsignado.idServicio === servicioAloj.idServicio;
        })
      ) {
        fetch(crudAlojamientoServiciosEndpoints.POST, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idAlojamiento: idAlojamiento,
            idServicio: servicioAsignado.idServicio,
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
          .catch((err) => {
            notify(err.message || 'error cargando servicio alojamiento');
          });
      }
    });
    // eliminar servicio alojamiento
    serviciosDelAlojamiento.data.map((servicioAloj) => {
      if (
        !serviciosAsignados.some((servicioAsignado) => {
          return servicioAsignado.idServicio === servicioAloj.idServicio;
        })
      ) {
        fetch(
          `${crudAlojamientoServiciosEndpoints.DELETE}/${servicioAloj.idAlojamientoServicio}`,
          {
            method: 'DELETE',
          }
        )
          .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
          .catch((err) => {
            notify(err.message || 'error eliminando servicio alojamiento');
          });
      }
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (
      name === 'CantidadDormitorios' ||
      name === 'CantidadBanios' ||
      name === 'idTipoAlojamiento'
    ) {
      setAlojamiento({
        ...alojamiento,
        [name]: parseInt(value),
      });
    } else if (name === 'PrecioPorDia')
      setAlojamiento({
        ...alojamiento,
        [name]: parseFloat(value),
      });
    else {
      setAlojamiento({
        ...alojamiento,
        [name]: value,
      });
    }
  };

  return (
    <fieldset>
      <legend>Alojamiento</legend>

      <form onSubmit={handleSubmit} data-id={alojamiento?.idAlojamiento}>
        <div className='form-grid'>
          <div className='form-grid-control'>
            <label htmlFor='Titulo'>Título</label>
            <input
              id='Titulo'
              type='text'
              placeholder='ej : Tandil, Buenos Aires'
              name='Titulo'
              value={alojamiento?.Titulo || ''}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='Descripcion'>Descripción</label>
            <textarea
              id='Descripcion'
              type='text'
              placeholder='ej : A 5 cuadras del centro'
              name='Descripcion'
              value={alojamiento?.Descripcion || ''}
              onChange={handleFilterChange}
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='idTipoAlojamiento'>Tipo</label>
            <select
              id='idTipoAlojamiento'
              name='idTipoAlojamiento'
              value={alojamiento?.idTipoAlojamiento || ''}
              onChange={handleFilterChange}
              required
            >
              <option value=''></option>
              {props.tipoAlojamientos?.data &&
                props.tipoAlojamientos.data.map((tipo, index) => (
                  <option key={index} value={tipo.idTipoAlojamiento}>
                    {tipo.Descripcion}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-grid-control'>
            <label htmlFor='Estado'>Estado</label>
            <select
              id='Estado'
              name='Estado'
              value={alojamiento?.Estado || 'Disponible'}
              onChange={handleFilterChange}
              required
            >
              <option value='Disponible'>Disponible</option>
              <option value='Reservado'>Reservado</option>
            </select>
          </div>
          <div className='form-grid-control'>
            <label htmlFor='CantidadDormitorios'>Dormitorios</label>
            <input
              type='number'
              id='CantidadDormitorios'
              name='CantidadDormitorios'
              placeholder='Ej. 1, 2, etc'
              value={alojamiento?.CantidadDormitorios || 0}
              min={0}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='CantidadBanios'>Baños</label>
            <input
              type='number'
              id='CantidadBanios'
              name='CantidadBanios'
              placeholder='Ej. 1, 2, etc'
              value={alojamiento?.CantidadBanios || 0}
              min={0}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='Latitud'>Latitud: </label>
            <input
              type='number'
              id='Latitud'
              name='Latitud'
              placeholder='-37.32167000'
              value={alojamiento?.Latitud || 0}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='Longitud'>Longitud: </label>
            <input
              type='number'
              id='Longitud'
              name='Longitud'
              placeholder='-59.13316000'
              value={alojamiento?.Longitud || 0}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className='form-grid-control'>
            <label htmlFor='PrecioPorDia'>Precio Por Día: </label>
            <input
              type='number'
              id='PrecioPorDia'
              name='PrecioPorDia'
              placeholder='$$$'
              value={alojamiento?.PrecioPorDia || 0}
              min={0}
              onChange={handleFilterChange}
              required
            />
          </div>
        </div>

        <AlojamientoServiciosForm
          editando={locationState}
          serviciosDelAlojamiento={serviciosDelAlojamiento}
          servicios={props.servicios}
          serviciosAsignados={serviciosAsignados}
          setServiciosAsignados={setServiciosAsignados}
        ></AlojamientoServiciosForm>

        <ButtonsWrapper>
          {locationState
            ? alojamientosUpdate.map(
                ({ actionType, text, stylesClassName }) => (
                  <AdminFormBtn
                    key={actionType}
                    {...{ actionType, text, stylesClassName }}
                  ></AdminFormBtn>
                )
              )
            : alojamientosNew.map(
                ({ actionType, text, stylesClassName, type }) => (
                  <AdminFormBtn
                    key={actionType}
                    {...{ actionType, text, stylesClassName, type }}
                  ></AdminFormBtn>
                )
              )}
        </ButtonsWrapper>
      </form>
    </fieldset>
  );
};

export default AlojamientoForm;
