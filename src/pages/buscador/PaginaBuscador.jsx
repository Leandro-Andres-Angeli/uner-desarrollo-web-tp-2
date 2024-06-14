import React, { useState, useEffect } from "react";
import handleCRUD from "../../utils/handleCrud";
import FiltroBusqueda from "./FiltroBusqueda";
import BuscadorAlojamiento from "./BuscadorAlojamiento";
import {
  crudAlojamientosEndpoints,
  crudImagenes,
} from "../../dbEndpointsAlojamiento";
import { crudTipoAlojamientosEndpoints } from "../../dbEndpoints";
import "./PaginaBuscador.css";

const PaginaBuscador = ({
  titulo = undefined,
  mostrarFiltro = true,
  cantidad = 0,
}) => {
  const intialState = {
    data: [],
    loading: false,
    done: true,
    error: null,
  };
  const [alojamientos, setAlojamientos] = useState(intialState);
  const [alojamientosJoined, setAlojamientosJoined] = useState(intialState);
  const [alojamientosFiltrados, setAlojamientosFiltrados] =
    useState(intialState);
  const [tipoAlojamientos, setTipoAlojamientos] = useState(intialState);
  const [imagenes, setImagenes] = useState(intialState);

  const cargaInicial = async () => {
    await handleCRUD(
      crudAlojamientosEndpoints.readAll,
      undefined,
      setAlojamientos
    );
    await handleCRUD(
      crudTipoAlojamientosEndpoints.readAll,
      undefined,
      setTipoAlojamientos
    );
    await handleCRUD(crudImagenes.readAll, undefined, setImagenes);
  };

  useEffect(() => {
    cargaInicial();
  }, []);

  useEffect(() => {
    if (cantidad > 0) {
      setAlojamientosFiltrados((prev) => {
        return {
          ...prev,
          done: true,
          loading: false,
          data: alojamientosJoined.data.slice(0, cantidad),
        };
      });
    }
  }, [alojamientosJoined]);

  useEffect(() => {
    if (alojamientos.done && tipoAlojamientos.done && imagenes.done) {
      setAlojamientosJoined((prev) => {
        return {
          ...prev,
          data: alojamientos.data.map((alojamiento) => {
            return {
              ...alojamiento,
              TipoAlojamiento: tipoAlojamientos.data.filter(
                (tipo) =>
                  tipo.idTipoAlojamiento === alojamiento.idTipoAlojamiento
              )[0]?.Descripcion,
              Pictures: imagenes.data.filter(
                (pic) => pic.idAlojamiento === alojamiento.idAlojamiento
              ),
            };
          }),
        };
      });
    }
  }, [alojamientos, tipoAlojamientos, imagenes]);

  return (
    <div className={mostrarFiltro ? "pagina-buscador" : ""}>
      {mostrarFiltro && (
        <h2 className="titulo">Encontrá tu próximo alojamiento</h2>
      )}
      {alojamientos.done && tipoAlojamientos.done && imagenes.done && (
        <>
          {mostrarFiltro && (
            <FiltroBusqueda
              tipoAlojamientos={tipoAlojamientos.data}
              alojamientos={alojamientosJoined}
              setAlojamientosFiltrados={setAlojamientosFiltrados}
            ></FiltroBusqueda>
          )}

          <BuscadorAlojamiento
            titulo={titulo}
            alojamientos={alojamientosFiltrados}
          ></BuscadorAlojamiento>
        </>
      )}
    </div>
  );
};

export default PaginaBuscador;
