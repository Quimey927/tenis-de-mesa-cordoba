import classes from './Solapas.module.css';

const Solapas = ({
  lista,
  controladorCambiarElementoActivo,
  idElementoActivo,
}) => {
  return (
    <div className={classes.solapas}>
      {lista.map((elem) => (
        <button
          key={elem.id}
          onClick={controladorCambiarElementoActivo.bind(null, elem.id)}
          className={
            idElementoActivo === elem.id
              ? `${classes.item} ${classes.activo}`
              : classes.item
          }
        >
          {elem.nombre}
        </button>
      ))}
    </div>
  );
};

export default Solapas;
