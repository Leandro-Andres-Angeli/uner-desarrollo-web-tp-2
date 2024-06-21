import React, { useEffect, useState } from "react";
import formStyles from "./ServiciosForm.module.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  crudAlojamientoServiciosEndpoints,
  crudServiciosEndpoints,
} from "../../../dbEndpointsServicios";
import crudOperations from "../../../utils/crudOperations";
import handleCRUD from "../../../utils/handleCrud";
import ButtonsWrapper, { AdminFormBtn } from "./../admin_shared/ButtonsWrapper";
import { serviciosUpdate, serviciosNew } from "../admin_shared/btnActions";

const ServiciosForm = (props) => {
  const location = useLocation();
  const history = useHistory();
  const locationState = Boolean(location?.state)
    ? location.state.el.nombre
    : null;
  const [servicio, setServicio] = useState({});
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
  };
  const [crudRes, setCrudRes] = useState(intialState);

  useEffect(() => {
    setServicio(location?.state?.el ?? {});
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute("data-action");
    console.log(action);
    if (action === "CANCEL") {
      setServicio({});
      history.push(location.pathname.split("/").slice(0, -1).join("/"));
      return;
    }

    const {
      nombre: { name, value },
    } = e.target;

    let endpoint = "";
    if (action === "POST") {
      endpoint = crudServiciosEndpoints[action];
    } else {
      endpoint = `${crudServiciosEndpoints[action]}/${servicio.id}`;
    }

    await handleCRUD(
      endpoint,
      crudOperations[action]({ [name]: value }),
      setCrudRes
    );

    if (!crudRes.error) {
      props?.setServicios &&
        props?.setServicios((prev) => ({ ...prev, update: true }));
      setServicio({});
    }
    if (Boolean(location.state)) {
      history.push(location.pathname.split("/").slice(0, -1).join("/"));
    }
  };

  return (
    <form onSubmit={handleSubmit} data-id={servicio?.idServicio}>
      <fieldset>
        <legend>Servicios</legend>
        <div className="form-control">
          <label>Nombre del servicio</label>
          <input
            type="text"
            placeholder="ej : wifi"
            name="nombre"
            value={servicio?.nombre || ""}
            onChange={(e) =>
              setServicio({ ...servicio, nombre: e.target.value })
            }
            required
          />
        </div>

        <ButtonsWrapper>
          {locationState
            ? serviciosUpdate.map(({ actionType, text, stylesClassName }) => (
                <AdminFormBtn
                  key={actionType}
                  {...{ actionType, text, stylesClassName }}
                ></AdminFormBtn>
              ))
            : serviciosNew.map(
                ({ actionType, text, stylesClassName, type }) => (
                  <AdminFormBtn
                    key={actionType}
                    {...{ actionType, text, stylesClassName, type }}
                  ></AdminFormBtn>
                )
              )}
        </ButtonsWrapper>
      </fieldset>
    </form>
  );
};

export default ServiciosForm;
