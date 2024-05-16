import React from "react";
import "./Alojamiento.css";

const Alojamiento = () => {
  return (
    <main className="alojamiento">
      <div className="chapa"></div>

      <section className="contenido">
        <h1>Playa Grande | Mar del Plata</h1>

        <div className="lugar separador">
          <img className="foto-principal" src="images/img1.jpeg" />
          <div className="fotos">
            <img src="images/img3.jpeg" />
            <img src="images/img4.jpeg" />
            <img src="images/img2.jpeg" />
            <div className="foto-ver-mas">
              <img src="images/img2.jpeg" />
              <p>Ver más...</p>
            </div>
          </div>
        </div>
        <div className="descripcion-alojamiento separador">
          <h2>Hotel Costa Galana, Argentina</h2>
          <p>4 huépedes | 2 dormitorios | 1 baño | 1 cocina comedor</p>
          <div className="anfitrion">
            <img
              src="images/mirta.jpg"
              alt="anfitrión"
              className="foto-anfitrion"
            />
            <div>
              <h3>
                <strong>Anfitrión: Mirta</strong>
              </h3>
              <p>Mega Superanfitrión | 55 años de experiencia como anfitrión</p>
            </div>
          </div>
          <div className="especificaciones-alojamiento">
            <ul>
              <li>
                <strong>
                  Este alojamiento está entre el 10% de los mejores
                </strong>
              </li>
              <li>
                Este alojamiento está bien posicionado, teniendo en cuenta sus
                calificaciones, evaluaciones y fiabilidad.
              </li>
              <li>
                <strong>Check-in autónomo</strong>
              </li>
              <li>
                Podés hacer el check-in por tu cuenta con una caja de seguridad
                para llaves.
              </li>
              <li>
                <strong>Mirta tiene la categoría de Mega Superanfitrión</strong>
              </li>
              <li>
                Los Mega Superanfitriones son anfitriones con experiencia y
                evaluaciones excelentes.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Alojamiento;
