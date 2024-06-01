import React, { useState } from 'react';

const FormPrueba = () => {
  const [user, setUser] = useState({ nombre: '', apellido: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formularioNombre = event.target.nombre.value;
    const formularioApellido = event.target.apellido.value;

    setUser({ nombre: formularioNombre, apellido: formularioApellido });
    event.target.reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type='text' required name='nombre' />
        </div>
        <div>
          <label>Apellido</label>
          <input type='text' required name='apellido' />
        </div>
        <button type='submit'>enviar</button>
      </form>
      <div>
        <h2>Datos ingresados</h2>
        {JSON.stringify(user)}
        {user.nombre}
        {user.apellido}
      </div>
    </>
  );
};

export default FormPrueba;
