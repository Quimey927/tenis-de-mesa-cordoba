import { obtenerNombreCompleto } from '../../../../utils/obtenerNombreCompleto';
import classes from './Jugador.module.css';

const Jugador = ({ jugador }) => {
  const {
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido,
    foto_perfil,
    nombre_club,
    categoria_fecoteme,
  } = jugador;

  const nombreCompleto = obtenerNombreCompleto(
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido
  );

  return (
    <li className={classes['jugador']}>
      <img src={foto_perfil} alt="Foto del jugador" />
      <p>{nombreCompleto}</p>
      <p>{nombre_club}</p>
      <p>{categoria_fecoteme}</p>
    </li>
  );
};

export default Jugador;
