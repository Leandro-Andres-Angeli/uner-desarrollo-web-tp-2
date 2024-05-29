import React from 'react';

const Formulario = ({ datosFormulario, setDatosFormulario, onChange, onReset }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onReset(); 
  };

  return (
    <main>
      <div className="contacto">
        <h1>Contacto</h1>
        <h2>Ingresá los datos para tu reserva</h2>
      </div>
      <form className="formulario" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={datosFormulario.nombre}
          onChange={onChange}
          required
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="ej.correo@ejemplo.com"
          value={datosFormulario.email}
          onChange={onChange}
          required
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="Ingresa tu teléfono"
          value={datosFormulario.telefono}
          onChange={onChange}
          required
        />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          className="mensajetextarea"
          placeholder="Escribe tu mensaje aquí"
          value={datosFormulario.mensaje}
          onChange={onChange}
          required
        ></textarea>
        <button className="icon-btn btn-index ml-30" type="submit">ENVIAR</button>
      </form>
    </main>
  );
}

export default Formulario;
