import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgregarJugadores from './AgregarJugadores.js';
import AccionesGrupo from './AccionesGrupo';
import TablaPosiciones from './TablaPosiciones';
import CrearPartidos from './CrearPartidos';
import ListaPartidos from '../ListaPartidos.js';
import ListaSets from '../ListaSets.js';
import Solapas from '../../UI/Solapas/Solapas';
import ListaColoresTabla from './ListaColoresTabla.js';
import { calcularNuevasFilas } from '../../../utils/calcularNuevasFilas';
import { borrarGrupo, editarFilaTabla } from '../../../api';

const ListaGrupos = ({
  grupos,
  categoriaFecha,
  idCategoriaFecha,
  idFecha,
  idFase,
  idGrupo,
  coloresTabla,
  filasTabla,
  partidosDelGrupo,
  sets,
  jugadores,
  jugadoresDeLaCategoriaFecha,
}) => {
  const [mostrarSets, setMostrarSets] = useState(false);

  const navigate = useNavigate();

  const controladorBorrarGrupo = (id) => {
    if (grupos.length === 1) {
      alert('No podés dejar a la fase sin grupos.');
      return;
    }

    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el grupo?'
    );

    if (continuar) {
      borrarGrupo(id);
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/grupo/${
          +idGrupo !== grupos[0].id ? grupos[0].id : grupos[1].id
        }`
      );
    }
  };

  const controladorRedireccionar = (id_grupo = idGrupo, id_partido = null) => {
    if (!id_partido) {
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/grupo/${id_grupo}`
      );
    } else {
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/grupo/${id_grupo}/partido/${id_partido}`
      );
    }
  };

  const nombreGrupo = grupos.find((grupo) => grupo.id === +idGrupo).nombre;

  const idsJugadoresGrupo = filasTabla.map((fila) => fila.id_jugador);
  const jugadoresDelGrupo = jugadores.filter((jugador) =>
    idsJugadoresGrupo.includes(jugador.id)
  );

  const actualizarTablaPosiciones = async (nuevosSets) => {
    const nuevasFilasTabla = calcularNuevasFilas(filasTabla, nuevosSets);
    for (let fila of nuevasFilasTabla) {
      await editarFilaTabla(fila);
    }
  };

  return (
    <>
      <Solapas
        lista={grupos}
        controladorCambiarElementoActivo={controladorRedireccionar}
        idElementoActivo={+idGrupo}
      />

      <AccionesGrupo
        idGrupo={+idGrupo}
        controladorBorrarElemento={controladorBorrarGrupo}
      />

      {filasTabla.length === 0 ? (
        <AgregarJugadores
          idGrupo={+idGrupo}
          jugadores={jugadores}
          categoriaFecha={categoriaFecha}
          idCategoriaFecha={idCategoriaFecha}
          nombreGrupo={nombreGrupo}
          jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
          controladorRedireccionar={controladorRedireccionar}
        />
      ) : (
        <>
          <TablaPosiciones
            filasTabla={filasTabla}
            coloresTabla={coloresTabla}
            controladorRedireccionar={controladorRedireccionar}
          />

          <ListaColoresTabla
            coloresTabla={coloresTabla}
            idGrupo={+idGrupo}
            controladorRedireccionar={controladorRedireccionar}
          />

          {partidosDelGrupo.length === 0 ? (
            <CrearPartidos
              dia={grupos[0].dia.substring(0, 10)}
              filasTabla={filasTabla}
              idGrupo={+idGrupo}
              controladorRedireccionar={controladorRedireccionar}
            />
          ) : !mostrarSets ? (
            <ListaPartidos
              idGrupo={+idGrupo}
              partidosDelGrupo={partidosDelGrupo}
              controladorRedireccionar={controladorRedireccionar}
              jugadoresDelGrupo={jugadoresDelGrupo}
              dia={grupos[0].dia.substring(0, 10)}
              setMostrarSets={setMostrarSets}
            />
          ) : (
            <ListaSets
              sets={sets}
              partidosDeLaEtapa={partidosDelGrupo}
              controladorRedireccionar={controladorRedireccionar}
              setMostrarSets={setMostrarSets}
              actualizarTablaPosiciones={actualizarTablaPosiciones}
            />
          )}
        </>
      )}
    </>
  );
};

export default ListaGrupos;
