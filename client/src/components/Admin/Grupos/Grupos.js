import { useState } from 'react';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import CrearGrupos from './CrearGrupos';
import CrearColoresTabla from './CrearColoresTabla';
import ListaGrupos from './ListaGrupos';

const Grupos = ({ grupos, idCategoriaFecha, idFecha, idFase, jugadores }) => {
  const [coloresElegidos, setColoresElegidos] = useState(true);

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
        idFecha={idFecha}
        idCategoriaFecha={idCategoriaFecha}
        idFase={idFase}
      />
    );
  }

  return (
    <>
      <AdminTituloPagina
        titulo="Grupos"
        to="grupos/nuevo"
        textoInterno="Agregar Grupo"
      />
      <ListaGrupos
        grupos={grupos}
        idCategoriaFecha={idCategoriaFecha}
        idFase={idFase}
        idFecha={idFecha}
        jugadores={jugadores}
      />
    </>
  );
};

export default Grupos;
