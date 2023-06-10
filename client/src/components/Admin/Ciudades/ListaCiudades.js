import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarCiudad } from '../../../api';

const ListaCiudades = ({ ciudades }) => {
  const navigate = useNavigate();

  const controladorBorrarCiudad = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la ciudad?'
    );

    if (continuar) {
      borrarCiudad(id);
      navigate('/admin/ciudades');
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Ciudades"
        to="nuevo"
        textoInterno="Agregar Ciudad"
      />
      <AdminTablaPagina
        array={ciudades}
        controladorBorrarElemento={controladorBorrarCiudad}
        encabezadosColumnas={['nombre']}
      />
    </>
  );
};

export default ListaCiudades;
