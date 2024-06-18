import React, { useState, useEffect } from "react";
import "./Servicios.css";

const Servicios = ({ serviciosData }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      const serviciosActualizados = await Promise.all(
        serviciosData.map(async (servicio) => {
          let src = `/servicios/${servicio.Nombre.toLowerCase()}.svg`;
          if (await checkIconoServicio(src)) {
            return {
              ...servicio,
              Src: src,
            };
          } else {
            return {
              ...servicio,
              Src: `/servicios/default.svg`,
            };
          }
        })
      );
      setServicios(serviciosActualizados);
    };

    cargarServicios();
  }, []);

  const checkIconoServicio = async (src) => {
    try {
      const response = await fetch(src, { method: "HEAD" });
      const contentType = response.headers.get("Content-Type");
      if (response.ok && contentType && contentType.startsWith("image")) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="servicios">
      {servicios.length > 0 ? (
        <>
          <h4>
            <strong>Este alojamiento cuenta con:</strong>
          </h4>
          <ul>
            {servicios.map((servicio, index) => {
              return (
                <li key={index}>
                  <img
                    src={servicio.Src}
                    alt={servicio.Nombre}
                    title={servicio.Nombre}
                    className="servicio-img"
                  />
                  <span className="servicio-nombre">
                    {servicio.Nombre.toUpperCase()}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <em>Este alojamiento no cuenta con servicios aún</em>
      )}
    </div>
  );
};

export default Servicios;
