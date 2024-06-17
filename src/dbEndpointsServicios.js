const baseURL = "http://localhost:3001/";

const alojamientoServicios = "alojamientosServicios/";
const getAllAlojamientoServicios = "getAllAlojamientoServicios";
const getAlojamientoServicio = "getAlojamientoServicio";
const createAlojamientoServicio = "createAlojamientoServicio";
const updateAlojamientoServicio = "updateAlojamientoServicio";
const deleteAlojamientoServicio = "deleteAlojamientoServicio";

export const crudAlojamientoServiciosEndpoints = {
  readAll: `${baseURL}${alojamientoServicios}${getAllAlojamientoServicios}`,
  readOne: `${baseURL}${alojamientoServicios}${getAlojamientoServicio}`,
  POST: `${baseURL}${alojamientoServicios}${createAlojamientoServicio}`,
  PUT: `${baseURL}${alojamientoServicios}${updateAlojamientoServicio}`,
  DELETE: `${baseURL}${alojamientoServicios}${deleteAlojamientoServicio}`,
};

const servicios = "servicio/";
const getAllServicios = "getAllServicios";
const getServicio = "getServicio";
const createServicio = "createServicio";
const updateServicio = "updateServicio";
const deleteServicio = "deleteServicio";

export const crudServiciosEndpoints = {
  readAll: `${baseURL}${servicios}${getAllServicios}`,
  readOne: `${baseURL}${servicios}${getServicio}`,
  POST: `${baseURL}${servicios}${createServicio}`,
  PUT: `${baseURL}${servicios}${updateServicio}`,
  DELETE: `${baseURL}${servicios}${deleteServicio}`,
};
