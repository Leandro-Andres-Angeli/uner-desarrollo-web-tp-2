import { useEffect, useRef, useState } from 'react';
const crudOperations = {
  GET: (data = null) => ({
    method: 'GET',
  }),
  POST: (data) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
  PUT: (data) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
  DELETE: (data) => ({
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }),
};
class CrudOperation {
  constructor(url, method, data) {
    this.url = url;
    this.method = method;
    this.data = data ?? null;
  }
  build() {
    console.log(this.method);
    return crudOperations[this.method](this.data);
  }
}
const UseCrud = (...args) => {
  const [result, setResult] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  });
  const [url, method, data] = args;
  console.log(args);

  // console.log(crudOperation);
  const dataCopy = useRef();
  dataCopy.current = data; /*  */
  useEffect(() => {
    const crudOperation = new CrudOperation(
      url,
      method,
      dataCopy.current
    ).build();
    console.log('render');
    const fetchToApi = async () => {
      try {
        const res = await fetch(url, crudOperation);
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setResult((prev) => ({
          ...prev,
          data,
          error: false,
        }));
      } catch (err) {
        console.log(err);
        const { status } = err;
        setResult((prev) => ({
          ...prev,
          error: true,

          status,
        }));
      } finally {
        setResult((prev) => ({
          ...prev,
          done: true,
          loading: false,
        }));
      }
    };
    fetchToApi();
    return () => {
      console.log('unmount');
    };
  }, [url, method]);
  return [result, setResult];
};

export default UseCrud;
