import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarJugador } from '../../../api';

const ListaJugadores = ({ jugadores }) => {
  const navigate = useNavigate();

  const controladorBorrarJugador = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el jugador?'
    );

    if (continuar) {
      borrarJugador(id);
      navigate('/admin/jugadores');
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Jugadores"
        to="nuevo"
        textoInterno="Agregar Jugador"
      />
      <AdminTablaPagina
        array={jugadores}
        controladorBorrarElemento={controladorBorrarJugador}
        encabezadosColumnas={['nombre', 'apellido']}
        mostrarCantidadEntradasYFiltro={true}
      />
    </>
  );
};

export default ListaJugadores;
