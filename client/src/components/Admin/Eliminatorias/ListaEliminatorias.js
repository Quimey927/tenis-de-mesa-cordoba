import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarEliminatoria } from '../../../api';

const ListaEliminatorias = ({
  eliminatorias,
  idFecha,
  idCategoriaFecha,
  idFase,
}) => {
  const navigate = useNavigate();

  const controladorBorrarEliminatoria = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la eliminatoria?'
    );

    if (continuar) {
      borrarEliminatoria(id);
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
      );
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Eliminatorias"
        to="eliminatorias/nuevo"
        textoInterno="Agregar Eliminatoria"
      />
      <AdminTablaPagina
        array={eliminatorias ? eliminatorias : []}
        controladorBorrarElemento={controladorBorrarEliminatoria}
        encabezadosColumnas={['nombre']}
      />
    </>
  );
};

export default ListaEliminatorias;
