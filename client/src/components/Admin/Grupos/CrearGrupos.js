import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { crearGrupos } from '../../../api';
import classes from './CrearGrupos.module.css';

const CrearGrupos = ({
  idCategoriaFecha,
  idFecha,
  idFase,
  setColoresElegidos,
}) => {
  const [cantidadGrupos, setCantidadGrupos] = useState(1);
  const navigate = useNavigate();

  const controladorCrearGrupos = async (evt) => {
    evt.preventDefault();

    const datosGrupo = {
      cant_grupos: cantidadGrupos,
      id_fase: idFase,
    };

    crearGrupos(datosGrupo);
    setColoresElegidos(false);

    navigate(
      `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
    );
  };

  return (
    <form className={classes.form} onSubmit={controladorCrearGrupos}>
      <Input
        type="number"
        id="cant_grupos"
        label="Cantidad de Grupos"
        defaultValue={1}
        onChange={(evt) => setCantidadGrupos(evt.target.value)}
      />
      <Button type="submit" className={classes.btn}>
        Crear
      </Button>
    </form>
  );
};

export default CrearGrupos;
