import { useLoaderData, useLocation } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import CrearGrupos from '../../../components/Admin/Grupos/CrearGrupos';
import CrearColoresTabla from '../../../components/Admin/Grupos/CrearColoresTabla';
import ListaGrupos from '../../../components/Admin/Grupos/ListaGrupos';
import ListaEliminatorias from '../../../components/Admin/Eliminatorias/ListaEliminatorias';
import {
  obtenerFase,
  obtenerGrupos,
  obtenerEliminatorias,
  obtenerEliminatoria,
  obtenerJugadores,
  obtenerFilasTabla,
  obtenerColoresTabla,
  obtenerPartidosDelGrupo,
  obtenerPartidosDeLaEliminatoria,
  obtenerSets,
  obtenerJugadoresDeLaCategoriaFecha,
} from '../../../api';

const PaginaInfoFase = () => {
  let {
    fase,
    grupos,
    eliminatorias,
    eliminatoria,
    idCategoriaFecha,
    idFecha,
    idFase,
    idGrupo,
    idEliminatoria,
    idPartido,
    filasTabla,
    coloresTabla,
    partidosDelGrupo,
    partidosDeLaEliminatoria,
    setsDelPartido,
    jugadores,
    jugadoresDeLaCategoriaFecha,
  } = useLoaderData();

  for (let i = 0; i < jugadoresDeLaCategoriaFecha.length; i++) {
    jugadoresDeLaCategoriaFecha[i] = jugadoresDeLaCategoriaFecha[i].id_jugador;
  }

  const { state } = useLocation();

  const { nombre, orden, tipo } = fase[0];

  const campos = [
    {
      nombre: 'Nombre',
      valor: nombre,
    },
    {
      nombre: 'Orden',
      valor: orden,
    },
    {
      nombre: 'Tipo',
      valor: tipo === 'G' ? 'Grupos' : 'Eliminatoria',
    },
  ];

  return (
    <>
      <AdminInfo
        titulo={nombre}
        campos={campos}
        to={`/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}`}
        editarTo={`/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/editar`}
      />

      {tipo === 'G' && grupos.length === 0 ? (
        <CrearGrupos
          idFecha={idFecha}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
        />
      ) : tipo === 'G' && state?.elegirColores ? (
        <CrearColoresTabla
          grupos={grupos}
          idFecha={idFecha}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
        />
      ) : tipo === 'G' ? (
        <ListaGrupos
          grupos={grupos}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
          idFecha={idFecha}
          idGrupo={idGrupo}
          idPartido={idPartido}
          filasTabla={filasTabla}
          coloresTabla={coloresTabla}
          partidosDelGrupo={partidosDelGrupo}
          setsDelPartido={setsDelPartido}
          jugadores={jugadores}
          jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
        />
      ) : (
        <ListaEliminatorias
          eliminatorias={eliminatorias}
          eliminatoria={eliminatoria}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
          idFecha={idFecha}
          idEliminatoria={idEliminatoria}
          idPartido={idPartido}
          partidosDeLaEliminatoria={partidosDeLaEliminatoria}
          setsDelPartido={setsDelPartido}
          jugadores={jugadores}
          jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
        />
      )}
    </>
  );
};

export default PaginaInfoFase;

export async function loader({ params }) {
  const {
    idFase,
    idCategoriaFecha,
    idFecha,
    idGrupo,
    idEliminatoria,
    idPartido,
  } = params;

  return {
    fase: await obtenerFase(idFase),
    grupos: await obtenerGrupos(idFase),
    eliminatorias: await obtenerEliminatorias(idFase),
    eliminatoria: idEliminatoria
      ? await obtenerEliminatoria(idEliminatoria)
      : undefined,
    idFase,
    idCategoriaFecha,
    idFecha,
    jugadores: await obtenerJugadores(),
    idGrupo,
    idEliminatoria,
    idPartido,
    filasTabla: idGrupo ? await obtenerFilasTabla(idGrupo) : undefined,
    coloresTabla: idGrupo ? await obtenerColoresTabla(idGrupo) : undefined,
    partidosDelGrupo: idGrupo
      ? await obtenerPartidosDelGrupo(idGrupo)
      : undefined,
    partidosDeLaEliminatoria: idEliminatoria
      ? await obtenerPartidosDeLaEliminatoria(idEliminatoria)
      : [],
    setsDelPartido: idPartido ? await obtenerSets(idPartido) : undefined,
    jugadoresDeLaCategoriaFecha: await obtenerJugadoresDeLaCategoriaFecha(
      idCategoriaFecha
    ),
  };
}
