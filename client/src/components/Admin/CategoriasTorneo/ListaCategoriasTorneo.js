import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarCategoriaTorneo } from '../../../api';

const ListaCategoriasTorneo = ({ categoriasTorneo, navegarA }) => {
  const navigate = useNavigate();

  const controladorBorrarCategoriaTorneo = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la categoria del torneo?'
    );

    if (continuar) {
      borrarCategoriaTorneo(id);
      navigate(navegarA);
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Categorías del torneo"
        to="categorias/nuevo"
        textoInterno="Agregar Categoría"
      />
      <AdminTablaPagina
        array={categoriasTorneo}
        controladorBorrarElemento={controladorBorrarCategoriaTorneo}
        encabezadosColumnas={['categoria', 'orden']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="categorias/"
        tieneSufijoEditar={true}
      />
    </>
  );
};

export default ListaCategoriasTorneo;
