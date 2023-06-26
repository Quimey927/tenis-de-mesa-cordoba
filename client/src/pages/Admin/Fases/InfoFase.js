import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ConfiguracionGrupos from '../../../components/Admin/Grupos/ConfiguracionGrupos';
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
  const {
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

  const [coloresElegidos, setColoresElegidos] = useState(true);

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
      <AdminInfo titulo={nombre} campos={campos} to="../.." />

      {tipo === 'G' && (grupos.length === 0 || !coloresElegidos) ? (
        <ConfiguracionGrupos
          grupos={grupos}
          idCategoriaFecha={idCategoriaFecha}
          idFase={idFase}
          idFecha={idFecha}
          coloresElegidos={coloresElegidos}
          setColoresElegidos={setColoresElegidos}
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
