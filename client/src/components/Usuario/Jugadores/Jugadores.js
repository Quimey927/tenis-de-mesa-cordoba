import Jugador from './Jugador/Jugador';
import classes from './Jugadores.module.css';

const Jugadores = ({ jugadores }) => {
  return (
    <ul className={classes['lista-jugadores']}>
      {jugadores.map((jugador) => (
        <Jugador key={jugador.id} jugador={jugador} />
      ))}
    </ul>
  );
};

export default Jugadores;
