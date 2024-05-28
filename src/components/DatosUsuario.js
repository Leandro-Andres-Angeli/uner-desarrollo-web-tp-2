import React from 'react';

const DatosUsuario = ({ datos }) => {
  return (
    <div className="datos-usuario">
      <h2>Información del Usuario:</h2>
      <p><strong>Nombre:</strong> {datos.nombre}</p>
      <p><strong>Email:</strong> {datos.email}</p>
      <p><strong>Teléfono:</strong> {datos.telefono}</p>
      <p><strong>Mensaje:</strong> {datos.mensaje}</p>
    </div>
  );
}

export default DatosUsuario;
