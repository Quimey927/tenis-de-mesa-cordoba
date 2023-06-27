import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarFase } from '../../../api';

const ListaFases = ({ fases, idFecha, idCategoriaFecha }) => {
  const navigate = useNavigate();

  const controladorBorrarFase = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la fase?'
    );

    if (continuar) {
      borrarFase(id);
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}`
      );
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Fases"
        to="fases/nuevo"
        textoInterno="Agregar Fase"
      />
      <AdminTablaPagina
        array={fases}
        controladorBorrarElemento={controladorBorrarFase}
        encabezadosColumnas={['nombre', 'orden', 'tipo']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="fases/"
        sufijoLinkEditar={fases}
        esListaFases={true}
      />
    </>
  );
};

export default ListaFases;
