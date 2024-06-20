const baseURL = "http://localhost:3001/";

const alojamiento = "alojamiento/";
const getAllAlojamientos = "getAlojamientos";
const getAlojamiento = "getAlojamiento";
const createAlojamiento = "createAlojamiento";
const putAlojamiento = "putAlojamiento";
const deleteAlojamiento = "deleteAlojamiento";

export const crudAlojamientosEndpoints = {
  readAll: `${baseURL}${alojamiento}${getAllAlojamientos}`,
  readOne: `${baseURL}${alojamiento}${getAlojamiento}`,
  POST: `${baseURL}${alojamiento}${createAlojamiento}`,
  PUT: `${baseURL}${alojamiento}${putAlojamiento}`,
  DELETE: `${baseURL}${alojamiento}${deleteAlojamiento}`,
};

export const crudImagenes = {
  readAll: `${baseURL}imagen/getAllImagenes`,
};
