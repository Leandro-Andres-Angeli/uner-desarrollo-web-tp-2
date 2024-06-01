import { useEffect, useRef, useState } from 'react';
import crudOperations from './crudOperations';

const UseCrud = (...args) => {
  const [result, setResult] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  });
  const [url, method, data] = args;
  console.log(args);

  const dataCopy = useRef();
  dataCopy.current = data; /*  */
  useEffect(() => {
    const fetchToApi = async () => {
      try {
        const res = await fetch(url);
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
