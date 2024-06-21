import React, { useEffect, useState } from "react";
import ServiciosForm from "./ServiciosForm";
import EntitiesList from "./../EntitiesList";
import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { crudServiciosEndpoints } from "../../../dbEndpointsServicios";
import handleCRUD from "../../../utils/handleCrud";

const ServicioLi = ({ id, nombre }) => {
  const { path } = useRouteMatch();

  return (
    <li className="adminEntityLink">
      <Link
        to={{
          pathname: `${path}/${id}`,
          state: {
            el: { id, nombre },
          },
        }}
      >
        {" "}
        Servicio :<strong>{nombre}</strong>{" "}
      </Link>
    </li>
  );
};

const ServiciosDashboard = () => {
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
    update: false,
  };
  const [servicios, setServicios] = useState(intialState);
  const { error, data, loading } = servicios;

  useEffect(() => {
    setServicios((prev) => ({ ...prev, update: false }));

    return async () => {
      await handleCRUD(crudServiciosEndpoints.readAll, undefined, setServicios);
    };
  }, [servicios.update]);

  return (
    <section style={{ paddingTop: " var(--pad-x)" }}>
      <ServiciosForm type={"PUT"} {...{ setServicios }}></ServiciosForm>
      <EntitiesList {...{ error, data, loading }} list={data}>
        <ul>
          {data.map((el, index) => {
            return (
              <ServicioLi
                key={index}
                id={el.idServicio}
                nombre={el.Nombre}
              ></ServicioLi>
            );
          })}
        </ul>
      </EntitiesList>
    </section>
  );
};

export default ServiciosDashboard;
