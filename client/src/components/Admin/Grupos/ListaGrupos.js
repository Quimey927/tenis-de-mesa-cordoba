import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import CrearGrupos from './CrearGrupos.js';
import CrearColoresTabla from './CrearColoresTabla.js';
import AgregarJugadores from './AgregarJugadores.js';
import AccionesGrupo from './AccionesGrupo';
import TablaPosiciones from './TablaPosiciones';
import PartidosDelGrupo from './PartidosDelGrupo';
import Solapas from '../../UI/Solapas/Solapas';
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
  const [coloresElegidos, setColoresElegidos] = useState(true);
  const [idElementoActivo, setIdElementoActivo] = useState(
    grupos.length > 0 ? grupos[0].id : null
  );
  const [filasTabla, setFilasTabla] = useState([]);
  const [coloresTabla, setColoresTabla] = useState([]);
  const [partidosDelGrupo, setPartidosDelGrupo] = useState([]);
  // este dummyEstado es para disparar el useEffect cuando agregamos jugadores o cambiamos colores tabla
  const [dummyEstado, setDummyEstado] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (idElementoActivo && coloresElegidos) {
      obtenerColoresTabla(idElementoActivo, setColoresTabla);
      obtenerFilasTabla(idElementoActivo, setFilasTabla);
      obtenerPartidosDelGrupo(idElementoActivo, setPartidosDelGrupo);
    }
  }, [idElementoActivo, coloresElegidos, dummyEstado]);

  const controladorBorrarGrupo = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el grupo?'
    );

    if (continuar) {
      setIdElementoActivo(
        idElementoActivo !== grupos[0].id ? grupos[0].id : grupos[1].id
      );
      borrarGrupo(id);
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
      );
    }
  };

  if (grupos.length === 0) {
    return (
      <CrearGrupos
        idFecha={idFecha}
        idCategoriaFecha={idCategoriaFecha}
        idFase={idFase}
        setColoresElegidos={setColoresElegidos}
      />
    );
  }

  if (!coloresElegidos) {
    return (
      <CrearColoresTabla
        setColoresElegidos={setColoresElegidos}
        grupos={grupos}
        setIdElementoActivo={setIdElementoActivo}
      />
    );
  }

  const grupo = grupos.find((grupo) => grupo.id === idElementoActivo);

  return (
    <>
      <AdminTituloPagina
        titulo="Grupos"
        to="grupos/nuevo"
        textoInterno="Agregar Grupo"
      />

      <Solapas
        lista={grupos}
        controladorCambiarElementoActivo={setIdElementoActivo}
        idElementoActivo={idElementoActivo}
      />

      <AccionesGrupo
        grupo_id={grupo.id}
        controladorBorrarElemento={controladorBorrarGrupo}
      />

      {filasTabla.length === 0 ? (
        <AgregarJugadores
          idGrupo={idElementoActivo}
          jugadores={jugadores}
          setDummyEstado={setDummyEstado}
          nombreGrupo={grupo.nombre}
        />
      ) : (
        <>
          <TablaPosiciones
            filasTabla={filasTabla}
            coloresTabla={coloresTabla}
            idGrupo={grupo.id}
            setDummyEstado={setDummyEstado}
          />

          <PartidosDelGrupo
            partidosDelGrupo={partidosDelGrupo}
            setDummyEstado={setDummyEstado}
            idGrupo={idElementoActivo}
            filasTabla={filasTabla}
            dia={grupos[0].dia.substring(0, 10)}
          />
        </>
      )}
    </>
  );
};

export default ListaGrupos;
