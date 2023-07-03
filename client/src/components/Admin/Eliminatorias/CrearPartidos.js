import { useState } from 'react';

import Select from '../../UI/Select/Select';
import Button from '../../UI/Button/Button';
import { crearPartidosDeLaEliminatoria } from '../../../api';
import classes from './CrearPartidos.module.css';

const CrearPartidos = ({ idEliminatoria, dia, controladorRedireccionar }) => {
  const [dondeEmpieza, setDondeEmpieza] = useState(1);
  const [tercerPuesto, setTercerPuesto] = useState('N');

  const controladorCrearPartidos = async (evt) => {
    evt.preventDefault();

    const datosPartidosEliminatoria = {
      dondeEmpieza,
      tercerPuesto,
      idEliminatoria: +idEliminatoria,
      dia,
    };

    crearPartidosDeLaEliminatoria(datosPartidosEliminatoria);
    controladorRedireccionar(idEliminatoria);
  };

  return (
    <form className={classes.form} onSubmit={controladorCrearPartidos}>
      <div className={classes.inputs}>
        <Select
          label="¿Dónde empieza?"
          id="donde_empieza"
          defaultValue={1}
          options={[
            { value: 1, texto: 'Final (2 Equipos)' },
            { value: 2, texto: 'Semifinal (4 Equipos)' },
            { value: 3, texto: 'Cuartos (8 Equipos)' },
            { value: 4, texto: 'Octavos (16 Equipos)' },
            { value: 5, texto: '16-avos (32 Equipos)' },
            { value: 6, texto: '32-avos (64 Equipos)' },
          ]}
          onChange={(evt) => setDondeEmpieza(+evt.target.value)}
        />

        <Select
          label="¿Se juega por el tercer puesto?"
          id="tercer_puetso"
          defaultValue={'N'}
          options={[
            { value: 'N', texto: 'No' },
            { value: 'S', texto: 'Sí' },
          ]}
          onChange={(evt) => setTercerPuesto(evt.target.value)}
        />
      </div>

      <Button type="submit" className={classes.btn}>
        Crear Partidos
      </Button>
    </form>
  );
};

export default CrearPartidos;
