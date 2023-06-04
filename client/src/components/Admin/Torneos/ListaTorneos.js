import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarJugador } from '../../../api';

const ListaTorneos = ({ torneos }) => {
  const navigate = useNavigate();

  const controladorBorrarTorneo = (id) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que querés eliminar el torneo?'
    );

    if (confirmar) {
      borrarJugador(id);
      navigate('/admin/torneos');
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Torneos"
        to="nuevo"
        textoInterno="Agregar Torneo"
      />
      <AdminTablaPagina
        array={torneos}
        controladorBorrarElemento={controladorBorrarTorneo}
        encabezadosColumnas={['titulo', 'temporada']}
      />
    </>
  );
};

export default ListaTorneos;
