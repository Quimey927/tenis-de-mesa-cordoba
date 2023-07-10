import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { crearGrupos } from '../../../api';
import classes from './CrearGrupos.module.css';

const CrearGrupos = ({ idCategoriaFecha, idFecha, idFase }) => {
  const [cantidadGrupos, setCantidadGrupos] = useState(1);
  const navigate = useNavigate();

  const controladorCrearGrupos = async (evt) => {
    evt.preventDefault();

    const datosGrupo = {
      cant_grupos: cantidadGrupos,
      id_fase: idFase,
    };

    crearGrupos(datosGrupo);

    navigate(
      `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`,
      { state: { elegirColores: true } }
    );
  };

  return (
    <form className={classes.form} onSubmit={controladorCrearGrupos}>
      <Input
        type="number"
        id="cant_grupos"
        label="Cantidad de Grupos"
        defaultValue={1}
        style={{ width: '8ch', display: 'inline' }}
        autoFocus
        onChange={(evt) => setCantidadGrupos(evt.target.value)}
      />
      <Button type="submit" className={classes.btn}>
        Crear
      </Button>
    </form>
  );
};

export default CrearGrupos;
