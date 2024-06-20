import crudOperations from './crudOperations';
/* funcion asincrona que se encarga de ejecutar los distintos 
metodos CRUD en la DB 

*/
/**
 *
 * @param {*} URL => API Endpoint
 * @param {*} method => e.g : GET ,POST ,PUT ,etc
 * @param {*} setter => setter que proviene de algun hook useState
 * @returns null && ejecuta el setter
 */
const handleCRUD = async (URL, method = crudOperations.GET, setter) => {
  try {
    const res = await fetch(URL, method);
    // console.log(method);

    // const data = await res.json();

    const data = await res.json();

    if (!res.ok) {
      return;
    }
    setter((prev) => ({
      ...prev,
      data,
      error: false,
    }));
    return data;
  } catch (err) {
    const { status } = err;
    setter((prev) => ({
      ...prev,
      error: true,

      status,
    }));
    return err;
  } finally {
    setter((prev) => ({
      ...prev,
      done: true,
      loading: false,
    }));
  }
};
export default handleCRUD;
