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
  obtenerSets,
} from '../../../api';

const PaginaInfoFase = () => {
  let {
    fase,
    grupos,
    eliminatorias,
    idCategoriaFecha,
    idFecha,
    idTorneo,
    idFase,
    idGrupo,
    idPartido,
    filasTabla,
    coloresTabla,
    partidosDelGrupo,
    setsDelPartido,
    jugadores,
  } = useLoaderData();

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
        idCategoriaFecha={idCategoriaFecha}
        idFase={idFase}
        idFecha={idFecha}
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
        />
      ) : (
        <ListaEliminatorias
          eliminatorias={eliminatorias}
          idCategoriaFecha={idCategoriaFecha}
          idTorneo={idTorneo}
          idFase={idFase}
          idFecha={idFecha}
        />
      )}
    </>
  );
};

export default PaginaInfoFase;

export async function loader({ params }) {
  const { idFase, idCategoriaFecha, idFecha, idTorneo, idGrupo, idPartido } =
    params;

  return {
    fase: await obtenerFase(idFase),
    grupos: await obtenerGrupos(idFase),
    eliminatorias: await obtenerEliminatorias(idFase),
    idFase,
    idCategoriaFecha,
    idFecha,
    idTorneo,
    jugadores: await obtenerJugadores(),
    idGrupo,
    idPartido,
    filasTabla: idGrupo ? await obtenerFilasTabla(idGrupo) : undefined,
    coloresTabla: idGrupo ? await obtenerColoresTabla(idGrupo) : undefined,
    partidosDelGrupo: idGrupo
      ? await obtenerPartidosDelGrupo(idGrupo)
      : undefined,
    setsDelPartido: idPartido ? await obtenerSets(idPartido) : undefined,
  };
}
