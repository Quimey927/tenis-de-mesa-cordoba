import classes from './Fecha.module.css';

const Fecha = ({ fecha }) => {
  const { nombre } = fecha;

  return (
    <div className={classes.fecha}>
      <p>{nombre}</p>
    </div>
  );
};

export default Fecha;
