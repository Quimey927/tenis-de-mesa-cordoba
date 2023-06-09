import React from 'react';
import parse from 'html-react-parser';

import classes from './Vivo.module.css';

const Vivo = ({ streamActivo }) => {
  if (streamActivo.length === 0) {
    return (
      <p className={classes['sin-transmision']}>
        No hay ninguna transmisión en vivo
      </p>
    );
  }

  const { codigo_embebido, torneo, temporada, nombre_fecha } = streamActivo[0];

  return (
    <div className={classes.vivo}>
      <h1>{nombre_fecha}</h1>
      <h2>
        {torneo} - {temporada}
      </h2>
      {parse(codigo_embebido)}
    </div>
  );
};

export default Vivo;
