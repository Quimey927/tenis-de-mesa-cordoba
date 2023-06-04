import Fecha from './Fecha/Fecha';
import classes from './ListaFechas.module.css';

const ListaFechas = ({ fechasDelMes }) => {
  let listaFechas = (
    <p className={classes['sin-fechas']}>No hay fechas registradas este mes.</p>
  );

  if (fechasDelMes.length > 0) {
    listaFechas = fechasDelMes.map((fecha) => (
      <Fecha key={fecha.id} fecha={fecha} />
    ));
  }

  return <ul className={classes['lista-fechas']}>{listaFechas}</ul>;
};

export default ListaFechas;
