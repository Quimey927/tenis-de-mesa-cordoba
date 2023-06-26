import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AgregarJugadores from './AgregarJugadores.js';
import AccionesGrupo from './AccionesGrupo';
import TablaPosiciones from './TablaPosiciones';
import CrearPartidos from './CrearPartidos';
import ListaPartidos from './ListaPartidos.js';
import ListaSets from './ListaSets.js';
import Solapas from '../../UI/Solapas/Solapas';
import ListaColoresTabla from './ListaColoresTabla.js';
import {
  borrarGrupo,
  obtenerFilasTabla,
  obtenerColoresTabla,
  obtenerPartidosDelGrupo,
  obtenerSets,
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
  const [setsPartido, setSetsPartido] = useState([]);
  const [idPartidoSetsEditandose, setIdPartidoSetsEditandose] = useState(null);
  const [jugador1, setJugador1] = useState('');
  const [jugador2, setJugador2] = useState('');
  const [ordenPartido, setOrdenPartido] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    obtenerColoresTabla(idGrupoActivo, setColoresTabla);
    obtenerFilasTabla(idGrupoActivo, setFilasTabla);
    obtenerPartidosDelGrupo(idGrupoActivo, setPartidosDelGrupo);
  }, [idGrupoActivo]);

  useEffect(() => {
    if (idPartidoSetsEditandose) {
      obtenerSets(idPartidoSetsEditandose, setSetsPartido);
    }
  }, [idPartidoSetsEditandose]);

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

  const controladorCambiarElementoActivo = (id) => {
    setIdGrupoActivo(id);
    setIdPartidoSetsEditandose(null);
  };

  const grupo = grupos.find((grupo) => grupo.id === idGrupoActivo);

  return (
    <>
      <Solapas
        lista={grupos}
        controladorCambiarElementoActivo={controladorCambiarElementoActivo}
        idGrupoActivo={idGrupoActivo}
        setIdPartidoSetsEditandose={setIdPartidoSetsEditandose}
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

          <ListaColoresTabla
            coloresTabla={coloresTabla}
            idGrupoActivo={idGrupoActivo}
          />

          {partidosDelGrupo.length === 0 ? (
            <CrearPartidos
              dia={grupos[0].dia.substring(0, 10)}
              filasTabla={filasTabla}
              idGrupo={idGrupoActivo}
              idCategoriaFecha={idCategoriaFecha}
              idFecha={idFecha}
              idFase={idFase}
            />
          ) : idPartidoSetsEditandose === null ? (
            <ListaPartidos
              partidosDelGrupo={partidosDelGrupo}
              setIdPartidoSetsEditandose={setIdPartidoSetsEditandose}
              setJugador1={setJugador1}
              setJugador2={setJugador2}
              setOrdenPartido={setOrdenPartido}
            />
          ) : (
            <ListaSets
              setsPartido={setsPartido}
              jugador1={jugador1}
              jugador2={jugador2}
              setJugador1={setJugador1}
              setJugador2={setJugador2}
              idPartidoSetsEditandose={idPartidoSetsEditandose}
              setIdPartidoSetsEditandose={setIdPartidoSetsEditandose}
              filasTabla={filasTabla}
              partidosDelGrupo={partidosDelGrupo}
              ordenPartido={ordenPartido}
              setOrdenPartido={setOrdenPartido}
            />
          )}
        </>
      )}
    </>
  );
};

export default ListaGrupos;
