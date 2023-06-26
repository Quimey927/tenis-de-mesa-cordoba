import { useState } from 'react';

import Button from '../../UI/Button/Button';
import Select from '../../UI/Select/Select';
import { crearFilasTabla } from '../../../api';
import classes from './AgregarJugadores.module.css';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';

const AgregarJugadores = ({ idGrupo, jugadores, nombreGrupo }) => {
  const [jugadoresGrupo, setJugadoresGrupo] = useState(['', '', '']);

  const controladorCambioInput = (evt) => {
    const index = +evt.target.id.split('-')[1];
    jugadoresGrupo[index] = evt.target.value;
  };

  const controladorAgregarJugador = () =>
    setJugadoresGrupo((estadoPrevio) => {
      let nuevoEstado = [...estadoPrevio, ''];
      return nuevoEstado;
    });

  const controladorQuitarJugador = () => {
    if (jugadoresGrupo.length <= 3) {
      alert('El mínimo es de 3 jugadores');
      return;
    }

    setJugadoresGrupo((estadoPrevio) => {
      const nuevoEstado = [...estadoPrevio].slice(0, -1);
      return nuevoEstado;
    });
  };

  const controladorAgregarJugadores = (evt) => {
    evt.preventDefault();
    crearFilasTabla(idGrupo, jugadoresGrupo);
  };

  const inputsJugadores = [];

  for (let i = 0; i < jugadoresGrupo.length; i++) {
    inputsJugadores.push(
      <Select
        key={i}
        label={`Jugador ${i + 1}`}
        id={`jugador-${i}`}
        onChange={controladorCambioInput}
        required={true}
        defaultValue={jugadoresGrupo[i]}
        options={[
          {
            value: '',
            key: 0,
            texto: 'Elegir jugador',
          },
          ...jugadores.map((jugador) => {
            return {
              key: jugador.id,
              value: jugador.id,
              texto: obtenerNombreCompleto(
                jugador.nombre,
                jugador.segundo_nombre,
                jugador.apellido,
                jugador.segundo_apellido
              ),
            };
          }),
        ]}
      />
    );
  }

  return (
    <form className={classes.form} onSubmit={controladorAgregarJugadores}>
      <div className={classes.titulo}>
        <h3>Elegir los Jugadores de: {nombreGrupo}</h3>
        <div>
          <Button
            onClick={controladorAgregarJugador}
            className={`${classes.btn} ${classes['btn-agregar']}`}
          >
            Agregar Jugador
          </Button>
          <Button
            onClick={controladorQuitarJugador}
            className={`${classes.btn} ${classes['btn-agregar']}`}
          >
            Quitar Jugador
          </Button>
        </div>
      </div>

      {inputsJugadores}

      <Button
        type="submit"
        className={`${classes.btn} ${classes['btn-crear']}`}
      >
        Agregar
      </Button>
    </form>
  );
};

export default AgregarJugadores;
