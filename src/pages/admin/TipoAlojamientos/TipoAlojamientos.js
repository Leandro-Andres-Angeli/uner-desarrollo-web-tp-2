import React, { useEffect, useState } from 'react';
import {
  BaseURL,
  getAllTiposDeAlojamiento,
  tiposDeAlojamiento,
} from '../../../dbEndpoints';

const TipoAlojamientos = () => {
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
    <section style={{ paddingTop: ' var(--pad-x)' }}>
      <div>{JSON.stringify(tiposAlojs)}</div>
    </section>
  );
};

export default TipoAlojamientos;
