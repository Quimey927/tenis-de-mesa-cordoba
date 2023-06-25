import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AgregarJugadores from './AgregarJugadores.js';
import AccionesGrupo from './AccionesGrupo';
import TablaPosiciones from './TablaPosiciones';
import PartidosDelGrupo from './PartidosDelGrupo';
import Solapas from '../../UI/Solapas/Solapas';
import ListaColoresTabla from './ListaColoresTabla.js';
import {
  borrarGrupo,
  obtenerFilasTabla,
  obtenerColoresTabla,
  obtenerPartidosDelGrupo,
} from '../../../api';

const ListaGrupos = ({
  grupos,
  idCategoriaFecha,
  idFecha,
  idFase,
  jugadores,
}) => {
  const [idGrupoActivo, setIdGrupoActivo] = useState(grupos[0].id);
  const [filasTabla, setFilasTabla] = useState([]);
  const [coloresTabla, setColoresTabla] = useState([]);
  const [partidosDelGrupo, setPartidosDelGrupo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    obtenerColoresTabla(idGrupoActivo, setColoresTabla);
    obtenerFilasTabla(idGrupoActivo, setFilasTabla);
    obtenerPartidosDelGrupo(idGrupoActivo, setPartidosDelGrupo);
  }, [idGrupoActivo]);

  const controladorBorrarGrupo = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el grupo?'
    );

    if (continuar) {
      setIdGrupoActivo(
        idGrupoActivo !== grupos[0].id ? grupos[0].id : grupos[1].id
      );
      borrarGrupo(id);
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
      );
    }
  };

  const grupo = grupos.find((grupo) => grupo.id === idGrupoActivo);

  return (
    <>
      <Solapas
        lista={grupos}
        controladorCambiarElementoActivo={setIdGrupoActivo}
        idGrupoActivo={idGrupoActivo}
      />

      <AccionesGrupo
        grupo_id={grupo.id}
        controladorBorrarElemento={controladorBorrarGrupo}
      />

      {filasTabla.length === 0 ? (
        <AgregarJugadores
          idGrupo={idGrupoActivo}
          jugadores={jugadores}
          nombreGrupo={grupo.nombre}
        />
      ) : (
        <>
          <TablaPosiciones
            filasTabla={filasTabla}
            coloresTabla={coloresTabla}
          />

          <ListaColoresTabla coloresTabla={coloresTabla} idGrupo={grupo.id} />

          <PartidosDelGrupo
            partidosDelGrupo={partidosDelGrupo}
            idGrupo={idGrupoActivo}
            filasTabla={filasTabla}
            dia={grupos[0].dia.substring(0, 10)}
          />
        </>
      )}
    </>
  );
};

export default ListaGrupos;
