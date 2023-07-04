import React from 'react';

import classes from './Vivo.module.css';

const Vivo = ({ streamActivo }) => {
  if (streamActivo.length === 0) {
    return (
      <p className={classes['sin-transmision']}>
        No hay ninguna transmisión en vivo
      </p>
    );
  }

  const { codigo_youtube, torneo, temporada, nombre_fecha } = streamActivo[0];

  return (
    <div className={classes.vivo}>
      <h1>{nombre_fecha}</h1>
      <h2>
        {torneo} - {temporada}
      </h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${codigo_youtube}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Vivo;
