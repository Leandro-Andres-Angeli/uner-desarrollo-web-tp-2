import React, { useEffect, useState } from 'react';
import callApi from '../../../utils/callApi';
import { crudAlojamientosEndpoints, crudImagenes } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';
import crudOperations from '../../../utils/crudOperations';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const imgValidate = (str) => Boolean(str.match(/(png)|(jpe?g)|(webp)$/));
const Imagenes = () => {
  const [errors, setErrors] = useState({ error: 'empty' });
  const [imagePreview, setImagePreview] = useState(null);
  const [alojamientos, setAlojamientos] = useState(null);
  const [result, setResult] = useState({});

  useEffect(() => {
    return async function () {
      return await callApi(crudAlojamientosEndpoints.readAll, setAlojamientos);
    };
  }, []);

  const notify = (text, type = 'error') => toast[type](text);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('in');
    if (!e.target.file) {
      console.log('not file');
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
      .then((res) => res.json())
      .then((res) => notify(res.message, 'success'))
      .catch((err) => console.log(err));
    // console.log(e);
    // const { file } = e.target;
    // console.log(file);
    // console.log(file?.files[0].type);
    // console.log(file.value);
    // const { type } = file?.files[0];
  };
  useEffect(() => {}, []);

  const handleInputCapture = ({ target }) => {
    const [file] = target?.files;
    console.log(file);
    const { type } = file;
    if (!imgValidate(type)) {
      setErrors({ error: 'debe cargar archivos de tipo imagen' });
      notify(errors.error);
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
      <div
        style={{
          display: 'flex',
          boxShadow: 'var(--box-shadow)',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <form
          onReset={() => setErrors({ error: 'empty' })}
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
                alojamientos.data.map((el) => {
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
          <button type='reset'>cancelar</button>
        </form>
        <div style={{ flex: 1 }}>
          <img
            style={{
              maxWidth: '30vw',
              boxShadow: 'var(--box-shadow)',
              borderRadius: '10px',
            }}
            src={
              imagePreview?.route ??
              '/images/tipo_alojamientos_pics/img_not_found.png'
            }
            alt=''
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Imagenes;
