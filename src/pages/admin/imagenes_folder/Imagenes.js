import React, { useEffect, useState } from 'react';
const imgValidate = (str) => Boolean(str.match(/(png)|(jpe?g)|(webp)$/));
const Imagenes = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
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
  const handleInputCapture = ({ target }) => {
    // const { file } = e.target;
    // console.log(file);
    // console.log(file.files[0].type);
    // console.log(file.value);

    const [file] = target?.files;
    console.log(file);
    const { type } = file;
    if (!imgValidate(type)) {
      return setErrors({ error: 'debe cargar archivos de tipo imagen' });
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
        <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingBottom: '2rem ',
            }}
          >
            <label style={{ width: 'auto' }}>vincular a alojamiento</label>
            <select style={{ width: 'fit-content' }}>
              <option value='' key=''>
                test
              </option>
            </select>
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
          {/* <div>
            <label>vincular a alojamiento</label>
            <select>
              <option value='' key=''>
                test
              </option>
            </select>
          </div> */}
        </form>
        <div style={{ flex: 1 }}>
          {imagePreview && (
            <img
              style={{
                maxWidth: '30vw',
                boxShadow: 'var(--box-shadow)',
                borderRadius: '10px',
              }}
              src={imagePreview.route}
              alt=''
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Imagenes;
