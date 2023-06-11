import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarCategoriaFecha } from '../../../api';

const ListaCategoriasFecha = ({ categoriasFecha, navegarA }) => {
  const navigate = useNavigate();

  const controladorBorrarCategoriaFecha = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la categoria de la fecha?'
    );

    if (continuar) {
      borrarCategoriaFecha(id);
      navigate(navegarA);
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Categorías de la fecha"
        to="editar/categorias/nuevo"
        textoInterno="Agregar Categoría"
      />
      <AdminTablaPagina
        array={categoriasFecha ? categoriasFecha : []}
        controladorBorrarElemento={controladorBorrarCategoriaFecha}
        encabezadosColumnas={['categoria', 'orden']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="editar/categorias/"
      />
    </>
  );
};

export default ListaCategoriasFecha;
