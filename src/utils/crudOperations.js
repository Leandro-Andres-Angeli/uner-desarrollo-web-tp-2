/* 

Objeto para reutilizar en las distintas 
peticiones que se hacen a las distintas entidades   
de la DB 
Usando punto (.) se accede a los diferentes metodos 
ej : Para hacer un POST => crudOperations.POST
llama a dicho  atributo (  el valor de este atributo es una funcion 
  en este caso
)
Los atributos que se encargan de guardar o alterar data en la DB 
llevan como atributo la informacion requerida para realizar dicha accion
a traves de argumento data
*/

const crudOperations = {
  GET: () => ({
    method: 'GET',
  }),
  /**
   *
   * @param {*} data  => data del form
   * @returns
   */
  POST: (data) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
  /**
   *
   * @param {*} data  => data del form
   * @returns
   */
  PUT: (data) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
  /**
   *
   * @param {*} data =>  Entidad Id
   * @returns
   */
  DELETE: (data) => ({
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
};
export default crudOperations;
