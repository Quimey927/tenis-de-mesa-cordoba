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
  obtenerJugadores,
  obtenerFilasTabla,
  obtenerColoresTabla,
  obtenerPartidosDelGrupo,
  obtenerPartidosDeLaEliminatoria,
  obtenerSets,
  obtenerJugadoresDeLaCategoriaFecha,
  obtenerCategoriaFecha,
} from '../../../api';

const PaginaInfoFase = () => {
  let {
    fase,
    grupos,
    eliminatorias,
    categoriaFecha,
    idCategoriaFecha,
    idFecha,
    idFase,
    idGrupo,
    idEliminatoria,
    filasTabla,
    coloresTabla,
    partidosDelGrupo,
    partidosDeLaEliminatoria,
    sets,
    jugadores,
    jugadoresDeLaCategoriaFecha,
  } = useLoaderData();

  if (jugadoresDeLaCategoriaFecha) {
    for (let i = 0; i < jugadoresDeLaCategoriaFecha.length; i++) {
      jugadoresDeLaCategoriaFecha[i] =
        jugadoresDeLaCategoriaFecha[i].id_jugador;
    }
  }

  const { state } = useLocation();

  const { nombre, orden, tipo, descripcion } = fase[0];

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
    {
      nombre: 'Descripción',
      valor: descripcion,
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
          categoriaFecha={categoriaFecha}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
          idFecha={idFecha}
          idGrupo={idGrupo}
          filasTabla={filasTabla}
          coloresTabla={coloresTabla}
          partidosDelGrupo={partidosDelGrupo}
          sets={sets}
          jugadores={jugadores}
          jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
        />
      ) : (
        <ListaEliminatorias
          eliminatorias={eliminatorias}
          categoriaFecha={categoriaFecha}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
          idFecha={idFecha}
          idEliminatoria={idEliminatoria}
          partidosDeLaEliminatoria={partidosDeLaEliminatoria}
          sets={sets}
          jugadores={jugadores}
          jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
        />
      )}
    </>
  );
};

export default PaginaInfoFase;

export async function loader({ params }) {
  const { idFase, idCategoriaFecha, idFecha, idGrupo, idEliminatoria } = params;

  return {
    fase: await obtenerFase(idFase),
    grupos: await obtenerGrupos(idFase),
    eliminatorias: await obtenerEliminatorias(idFase),
    idFase,
    categoriaFecha: await obtenerCategoriaFecha(idCategoriaFecha),
    idCategoriaFecha,
    idFecha,
    jugadores: await obtenerJugadores(),
    idGrupo,
    idEliminatoria,
    filasTabla: idGrupo ? await obtenerFilasTabla(idGrupo) : undefined,
    coloresTabla: idGrupo ? await obtenerColoresTabla(idGrupo) : undefined,
    partidosDelGrupo: idGrupo
      ? await obtenerPartidosDelGrupo(idGrupo)
      : undefined,
    partidosDeLaEliminatoria: idEliminatoria
      ? await obtenerPartidosDeLaEliminatoria(idEliminatoria)
      : [],
    sets:
      idGrupo || idEliminatoria
        ? await obtenerSets(idGrupo, idEliminatoria)
        : undefined,
    jugadoresDeLaCategoriaFecha: await obtenerJugadoresDeLaCategoriaFecha(
      idCategoriaFecha
    ),
  };
}
