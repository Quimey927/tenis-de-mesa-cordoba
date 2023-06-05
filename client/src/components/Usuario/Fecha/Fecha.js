import classes from './Fecha.module.css';

const Fecha = ({ fecha }) => {
  const {
    nombre,
    torneo,
    temporada,
    fecha_inicio,
    fecha_finalizacion,
    lugar,
    imagen_torneo,
  } = fecha[0];

  return (
    <div
      className={classes.fecha}
      style={{
        backgroundImage: `${imagen_torneo}`,
        backgroundSize: 'cover',
      }}
    >
      <p>{nombre}</p>
      <p>{torneo}</p>
      <p>{temporada}</p>
      <p>{fecha_inicio}</p>
      <p>{fecha_finalizacion}</p>
      <p>{lugar}</p>
    </div>
  );
};

export default Fecha;
