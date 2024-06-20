import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const ImagenForm = ({
  setErrors,
  setImagePreview,
  handleSubmit,
  handleInputCapture,
  alojamientos,
  errors,
}) => {
  const location = useLocation();
  const [imgValues, setImgValues] = useState(null);

  return (
    <form
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
      <button className='btn btn-delete' type='reset'>
        cancelar
      </button>
    </form>
  );
};

export default ImagenForm;
