import React, { useState } from 'react';

const Formulario = ({ onSubmit }) => {
    const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formulario);

    setFormulario({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  return (
    <main>
      <div className="contacto">
        <h1>Contacto</h1>
        <h2>Ingresá los datos para tu reserva</h2>
      </div>
      <form className="formulario" onSubmit={handleSubmit}>
      
        <label htmlFor="nombre" >Nombre:</label>
        <input 
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="ej.correo@ejemplo.com"
          value={formulario.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="Ingresa tu teléfono"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          className="mensajetextarea"
          placeholder="Escribe tu mensaje aquí"
          value={formulario.mensaje}
          onChange={handleChange}
          required
        ></textarea>
        <button className="icon-btn btn-index ml-30" type="submit">ENVIAR</button>
      </form>
    </main>
  );
}

export default Formulario;
