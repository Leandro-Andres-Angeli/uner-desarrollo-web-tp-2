import React, { useState, useEffect } from "react";
import { SiteIcon } from "../../icons/SiteIcon";
import "./FiltroBusqueda.css";

function FiltroBusqueda({
  tipoAlojamientos,
  alojamientos,
  setAlojamientosFiltrados,
}) {
  const [filtros, setFiltros] = useState(
    localStorage.getItem("filtro_busqueda")
      ? JSON.parse(localStorage.getItem("filtro_busqueda"))
      : {
          idTipoAlojamiento: "",
          Estado: "",
          PrecioPorDia: "",
          CantidadDormitorios: 0,
          CantidadBanios: 0,
        }
  );

  // Función para manejar cambios en los filtros
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "CantidadDormitorios" || name === "CantidadBanios") {
      setFiltros({
        ...filtros,
        [name]: value === "0" ? "" : parseInt(value),
      });
    } else {
      setFiltros({
        ...filtros,
        [name]: value,
      });
    }
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFiltrar = (e) => {
    e.preventDefault();
    filtrarAlojamientos();
  };

  // Función para aplicar filtros y obtener resultados filtrados
  const filtrarAlojamientos = async (e) => {
    localStorage.setItem("filtro_busqueda", JSON.stringify(filtros));

    setAlojamientosFiltrados((prev) => {
      return { ...prev, loading: true };
    });

    var precios;
    if (filtros.PrecioPorDia.includes("|")) {
      var preciosSeparados = filtros.PrecioPorDia.split("|");
      precios = {
        min: parseFloat(preciosSeparados[0]),
        max:
          preciosSeparados[1] === ""
            ? undefined
            : parseFloat(preciosSeparados[1]),
      };
    }

    await wait(1000);

    setAlojamientosFiltrados((prev) => {
      return {
        ...prev,
        loading: false,
        data: alojamientos.data.filter((alojamiento) => {
          if (
            alojamiento.idTipoAlojamiento.toString() !==
            filtros.idTipoAlojamiento
          )
            return false;

          if (precios) {
            console.log(precios);
            if (parseFloat(alojamiento.PrecioPorDia) < precios.min)
              return false;
            if (
              precios.max &&
              parseFloat(alojamiento.PrecioPorDia) > precios.max
            )
              return false;
          }
          if (filtros.Estado !== "")
            if (alojamiento.Estado !== filtros.Estado) return false;

          if (filtros.CantidadBanios > 0)
            if (parseInt(alojamiento.CantidadBanios) !== filtros.CantidadBanios)
              return false;

          if (filtros.CantidadDormitorios > 0)
            if (
              parseInt(alojamiento.CantidadDormitorios) !==
              filtros.CantidadDormitorios
            )
              return false;

          return true;
        }),
      };
    });
  };

  useEffect(() => {
    if (alojamientos.data.length > 0) {
      filtrarAlojamientos();
    }
  }, [alojamientos]);

  return (
    <div>
      <form onSubmit={(e) => handleFiltrar(e)}>
        <div className="filtro">
          <div className="filtro-item">
            <label htmlFor="idTipoAlojamiento">Tipo</label>
            <select
              id="idTipoAlojamiento"
              name="idTipoAlojamiento"
              value={filtros.idTipoAlojamiento}
              onChange={handleFilterChange}
              required
            >
              <option value=""></option>
              {tipoAlojamientos &&
                tipoAlojamientos.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.idTipoAlojamiento}>
                      {tipo.Descripcion}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="filtro-item">
            <label htmlFor="Estado">Estado</label>
            <select
              id="Estado"
              name="Estado"
              value={filtros.Estado}
              onChange={handleFilterChange}
            >
              <option value=""></option>
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
            </select>
          </div>
          <div className="filtro-item">
            <label htmlFor="CantidadDormitorios">Dormitorios</label>
            <input
              type="number"
              id="CantidadDormitorios"
              name="CantidadDormitorios"
              placeholder="Ej. 1, 2, etc"
              value={
                filtros.CantidadDormitorios === 0
                  ? ""
                  : filtros.CantidadDormitorios
              }
              min={0}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filtro-item">
            <label htmlFor="CantidadBanios">Baños</label>
            <input
              type="number"
              id="CantidadBanios"
              name="CantidadBanios"
              placeholder="Ej. 1, 2, etc"
              value={filtros.CantidadBanios === 0 ? "" : filtros.CantidadBanios}
              min={0}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filtro-item">
            <label htmlFor="PrecioPorDia">Precio Por Día: </label>
            <select
              id="PrecioPorDia"
              name="PrecioPorDia"
              value={filtros.PrecioPorDia}
              onChange={handleFilterChange}
            >
              <option value=""></option>
              <option value="0|5000">hasta $5.000</option>
              <option value="5000|10000">$5.000 a $10.000</option>
              <option value="10000|20000">$10.000 a $20.000</option>
              <option value="20000|">más de $20.000</option>
            </select>
          </div>
        </div>
        <button type="submit" className="icon-btn btn-index">
          <SiteIcon className={"nav-logo-icon"}></SiteIcon>
          Buscar Alojamiento
        </button>
      </form>
    </div>
  );
}

export default FiltroBusqueda;
