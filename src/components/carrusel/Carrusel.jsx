import React, { useState, useEffect } from "react";
// import "./Opinion.css";
import "./Carrusel.css";

const Carrusel = ({ children, automatico = false }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  const clickDerecha = () => {
    const nuevoIndice = (indiceActual - 1 + children.length) % children.length;
    setIndiceActual(nuevoIndice);
  };

  const clickIzquierda = () => {
    const nuevoIndice = (indiceActual + 1) % children.length;
    setIndiceActual(nuevoIndice);
  };

  useEffect(() => {
    if (automatico) {
      const intervalo = setInterval(() => {
        setIndiceActual((previo) => (previo + 1) % children.length);
      }, 4000);

      return () => clearInterval(intervalo);
    }
  }, []);

  return (
    <div className="carrusel">
      <button
        hidden={automatico}
        className="boton-carrusel izquierda"
        onClick={clickIzquierda}
      >
        {"<"}
      </button>
      <div className="contenido-carrusel">
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div
                key={index}
                className={`item-carrusel ${
                  index === indiceActual ? "item-activo" : ""
                }`}
              >
                {child}
              </div>
            ))
          : children}
      </div>
      <button
        hidden={automatico}
        className="boton-carrusel derecha"
        onClick={clickDerecha}
      >
        {">"}
      </button>
    </div>
  );
};
export default Carrusel;
