import React, { useEffect, useState } from 'react';
import callApi from '../../../utils/callApi';
import { crudAlojamientosEndpoints, crudImagenes } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';
import crudOperations from '../../../utils/crudOperations';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntitiesList from './../EntitiesList';
import notify from '../../../utils/toastNotify';
import ImagenesLi from '../ImagenesLi';
import ImagenForm from './imagenFormComponents/ImagenForm';
import intialState from '../../../utils/initialState';
import imgValidate from '../../../utils/imgValidate';

const Imagenes = () => {
  const [errors, setErrors] = useState({ error: 'empty' });
  const [imagePreview, setImagePreview] = useState(null);
  const [alojamientos, setAlojamientos] = useState(intialState);
  const [imagenes, setImagenes] = useState(intialState);

  useEffect(() => {
    Promise.all([
      handleCRUD(crudAlojamientosEndpoints.readAll, undefined, setAlojamientos),
      handleCRUD(crudImagenes.readAll, undefined, setImagenes),
    ])
      .then((data) => {
        return data;
      })

      .catch((err) => notify(err.message || 'error cargando data'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.file) {
      return;
    }
    const {
      file: { name: RutaArchivo },
      idAlojamiento,
    } = Object.fromEntries(new FormData(e.target));
    fetch(crudImagenes.POST, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ idAlojamiento, RutaArchivo }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        if (!res.ok) {
          // console.log(res);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => notify(res.message, 'success'))
      .catch((err) => {
        notify(err.message || 'error cargando imagen');
      });
  };

  const handleInputCapture = ({ target }) => {
    const [file] = target?.files;
    // console.log(file);
    const { type } = file;
    if (!imgValidate(type)) {
      setErrors({ error: 'debe cargar archivos de tipo imagen' });
      notify('debe cargar archivos de tipo imagen');
      return;
    }
    setImagePreview({
      type,
      route: `/images/tipo_alojamientos_pics/${file.name}`,
    });
    setErrors({});
  };
  return (
    <section style={{ paddingTop: 'var(--pad-x)' }}>
      <ImagenForm
        {...{
          setErrors,
          setImagePreview,
          imagePreview,
          handleSubmit,
          handleInputCapture,
          alojamientos,
          errors,
        }}
      ></ImagenForm>
      {/* REFACTORED INTO COMPONENT */}
      {/*      <form
          onReset={() => {
            setErrors({ error: 'empty' });
            setImagePreview(null);
          }}
          onSubmit={handleSubmit}
          style={{ flexGrow: 1 }}
        >
          <h2> Imagenes </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingBottom: '2rem ',
            }}
          >
            <label style={{ width: 'auto' }}> Seleccionar imagen:</label>
            <input
              accept='.jpg , .jpeg , .webp , .png'
              name='file'
              type='file'
              style={{ margin: 0, padding: 0 }}
              onInputCapture={handleInputCapture}
            />
          </div>

          <div className='form-control'>
            <label>vincular a alojamiento</label>
            <select name='idAlojamiento'>
              {alojamientos &&
                alojamientos?.data?.map((el) => {
                  console.log(el);
                  return (
                    <option value={el.idAlojamiento} key={el.idAlojamiento}>
                      {el.Titulo}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            type='submit'
            style={{
              borderRadius: '20px',
              padding: '10px 15px',
              backgroundColor: `${
                Boolean(Object.keys(errors).length === 0)
                  ? 'var(--primary-color)'
                  : 'gray'
              }`,
              boxShadow: 'var(--box-shadow)',
              cursor: 'pointer',
            }}
            // disabled={String(Boolean(Object.keys(errors).length !== 0))}
            disabled={!Boolean(Object.keys(errors).length === 0)}
          >
            enviar
          </button>
          <button className='btn btn-delete' type='reset'>
            cancelar
          </button>
        </form> */}
      {/* REFACTORED INTO COMPONENT */}

      <EntitiesList list={imagenes.data}>
        <ul>
          {imagenes?.data.map((el) => {
            // console.log('img', el);
            const { idImagen, idAlojamiento, RutaArchivo } = el;
            return (
              <ImagenesLi
                key={idImagen}
                id={idImagen}
                idAloj={idAlojamiento}
                route={RutaArchivo}
              ></ImagenesLi>
            );
          })}
        </ul>
      </EntitiesList>
      <ToastContainer />
    </section>
  );
};

export default Imagenes;
