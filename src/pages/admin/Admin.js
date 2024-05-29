import React, { useEffect, useState } from 'react';
import {
  BaseURL,
  getAllTiposDeAlojamiento,
  tiposDeAlojamiento,
} from '../../dbEndpoints';

const Admin = () => {
  const [tiposAlojs, setTiposAloj] = useState({
    tiposAlojamientos: [],
    loading: true,
    done: false,
  });

  useEffect(() => {
    console.log('render');
    const getTiposDeAloj = async () => {
      try {
        const res = await fetch(
          `${BaseURL}${tiposDeAlojamiento}${getAllTiposDeAlojamiento}`
        );

        // if (!res.ok) {
        //   return;
        // }
        const data = await res.json();
        setTiposAloj((prev) => ({
          ...prev,
          loading: false,
          done: true,
          tiposAlojamientos: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    getTiposDeAloj();
  }, []);

  return (
    <main className='main'>
      <h1>Administracion</h1>
      <div>{JSON.stringify(tiposAlojs)}</div>
    </main>
  );
};

export default Admin;
