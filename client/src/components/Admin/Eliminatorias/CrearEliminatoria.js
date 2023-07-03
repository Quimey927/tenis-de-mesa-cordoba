import { useState } from 'react';

import Button from '../../UI/Button/Button';
import Textarea from '../../UI/Textarea/Textarea';
import { crearEliminatoria } from '../../../api';
import classes from './CrearEliminatoria.module.css';

const CrearEliminatoria = ({ idFase, controladorRedireccionar }) => {
  const [descripcion, setDescripcion] = useState('');

  const controladorCrearEliminatoria = async (evt) => {
    evt.preventDefault();

    const datosEliminatoria = {
      descripcion,
      idFase: +idFase,
    };

    const idEliminatoria = await crearEliminatoria(datosEliminatoria);

    controladorRedireccionar(idEliminatoria[0].id);
  };

  return (
    <form className={classes.form} onSubmit={controladorCrearEliminatoria}>
      <Textarea
        id="descripcion"
        label="Descripción"
        onChange={(evt) => setDescripcion(evt.target.value)}
      />

      <Button type="submit" className={classes.btn}>
        Crear Eliminatoria
      </Button>
    </form>
  );
};

export default CrearEliminatoria;
