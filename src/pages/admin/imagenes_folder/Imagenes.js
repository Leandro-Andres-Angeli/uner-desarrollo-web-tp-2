import React, { useEffect, useState } from 'react';
const imgValidate = (str) => Boolean(str.match(/(png)|(jpe?g)|(webp)$/));
const Imagenes = () => {
  const [errors, setErrors] = useState({});
  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    const { file } = e.target;
    console.log(file);
    console.log(file?.files[0].type);
    console.log(file.value);
    const { type } = file.files[0];
  };
  const handleValidation = ({ target }) => {
    // const { file } = e.target;
    // console.log(file);
    // console.log(file.files[0].type);
    // console.log(file.value);

    const { type } = target?.files[0];
    if (!imgValidate(type)) {
      return setErrors({ error: 'debe cargar archivos de tipo imagen' });
    }
    setErrors({});
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2> Imagenes </h2>
          </legend>
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
              onInputCapture={handleValidation}
            />
          </div>
          <button
            type='submit'
            style={{
              borderRadius: '20px',
              padding: '10px 15px',
              backgroundColor: 'var(--primary-color)',
              boxShadow: 'var(--box-shadow)',
              cursor: 'pointer',
            }}
            // disabled={String(Boolean(Object.keys(errors).length !== 0))}
            disabled={Boolean(Object.keys(errors).length !== 0)}
          >
            enviar
          </button>
        </fieldset>
        <select></select>
      </form>
    </main>
  );
};

export default Imagenes;
