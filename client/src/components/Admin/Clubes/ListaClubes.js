import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarClub } from '../../../api';

const ListaJugadores = ({ clubes }) => {
  const navigate = useNavigate();

  const controladorBorrarClub = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el club?'
    );

    if (continuar) {
      borrarClub(id);
      navigate('/admin/clubes');
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Clubes"
        to="nuevo"
        textoInterno="Agregar Club"
      />
      <AdminTablaPagina
        array={clubes}
        controladorBorrarElemento={controladorBorrarClub}
        encabezadosColumnas={['nombre']}
        sufijoLinkEditar="/editar"
      />
    </>
  );
};

export default ListaJugadores;
