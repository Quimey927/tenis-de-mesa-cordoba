import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import { crearFilasTabla, agregarJugadoresACategoriaFecha } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useElegirElementosDeArray from '../../../hooks/useElegirElementosDeArray';
import classes from './AgregarJugadores.module.css';

const AgregarJugadores = ({
  idGrupo,
  jugadores,
  nombreGrupo,
  categoriaFecha,
  idCategoriaFecha,
  jugadoresDeLaCategoriaFecha,
  controladorRedireccionar,
}) => {
  const {
    elementosElegidos: jugadoresGrupo,
    controladorAgregarElemento: controladorAgregarJugador,
    elementosFiltrados: jugadoresFiltrados,
    controladorEliminarElemento: controladorEliminarJugador,
    seMuestranOpciones,
    setSeMuestranOpciones,
    filtro,
    setFiltro,
  } = useElegirElementosDeArray(jugadores, [
    'nombre',
    'apellido',
    'segundo_nombre',
    'segundo_apellido',
  ]);

  const controladorAgregarJugadores = (evt) => {
    evt.preventDefault();

    if (jugadoresGrupo.length < 2) {
      alert('Agregar más jugadores');
      return;
    }

    const idsJugadoresGrupo = jugadoresGrupo.map((jugador) => jugador.id);

    const nuevosJugadoresCategoriaFecha = idsJugadoresGrupo.filter(
      (jugador) => !jugadoresDeLaCategoriaFecha.includes(jugador)
    );

    agregarJugadoresACategoriaFecha(
      nuevosJugadoresCategoriaFecha,
      idCategoriaFecha,
      categoriaFecha[0].id_categoria_torneo_default
    );

    crearFilasTabla(idGrupo, idsJugadoresGrupo);
    controladorRedireccionar();
  };

  return (
    <>
      <h3 className={classes.titulo}>
        <small>{nombreGrupo} - </small>
        Elegir jugadores
      </h3>
      <div className={classes['listas']}>
        <ul className={classes['lista-jugadores-grupo']}>
          {jugadoresGrupo.map((jugador) => (
            <li key={jugador.id}>
              <span>
                {obtenerNombreCompleto(
                  jugador.nombre,
                  jugador.segundo_nombre,
                  jugador.apellido,
                  jugador.segundo_apellido
                )}
              </span>
              <button
                className={`${classes.btn} ${classes['btn-eliminar']}`}
                onClick={controladorEliminarJugador.bind(null, jugador.id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </li>
          ))}
          <input
            className={classes['input-transparente']}
            id="input-transparente"
            value={filtro ? filtro : ''}
            onChange={(evt) => setFiltro(evt.target.value)}
            onFocus={() => setSeMuestranOpciones(true)}
          />
        </ul>
        <ul
          className={`${classes['lista-jugadores-posibles']} ${
            seMuestranOpciones ? '' : classes['display-none']
          }`}
        >
          {jugadoresFiltrados.map((jugador) => (
            <button
              key={jugador.id}
              className={classes['jugador-elegible']}
              onClick={controladorAgregarJugador.bind(null, jugador.id)}
              onBlur={() => setSeMuestranOpciones(true)}
            >
              {obtenerNombreCompleto(
                jugador.nombre,
                jugador.segundo_nombre,
                jugador.apellido,
                jugador.segundo_apellido
              )}
            </button>
          ))}
          <button
            className={classes['cerrar-opciones']}
            onClick={() => setSeMuestranOpciones(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </ul>
      </div>
      <Button
        type="submit"
        onClick={controladorAgregarJugadores}
        className={`${classes.btn} ${classes['btn-crear']}`}
      >
        Listo
      </Button>
    </>
  );
};

export default AgregarJugadores;
