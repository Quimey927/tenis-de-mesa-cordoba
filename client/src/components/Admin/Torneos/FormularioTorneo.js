import { useNavigate } from 'react-router-dom';

import AdminFormulario from '../AdminFormulario/AdminFormulario';
import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import Input from '../../UI/Input/Input';
import { crearTorneo, editarTorneo, borrarCategoriaTorneo } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioTorneo = ({ method, torneo, torneos, categoriasTorneo }) => {
  const navigate = useNavigate();

  const controladorBorrarCategoriaTorneo = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la categoria del club?'
    );

    if (continuar) {
      borrarCategoriaTorneo(id);
      navigate(`/admin/torneos/${torneo[0].id}`);
    }
  };

  return (
    <>
      <AdminFormulario
        method={method}
        texto_titulo={
          method === 'POST' ? ' Agregar torneo' : `Editar ${torneo[0].titulo}`
        }
      >
        <Input
          id="titulo"
          required="true"
          label="Título"
          disabled={method !== 'POST'}
          defaultValue={torneo ? torneo[0].titulo : ''}
        />
        <Input
          id="temporada"
          required="true"
          label="Temporada"
          disabled={method !== 'POST'}
          defaultValue={torneo ? torneo[0].temporada : ''}
        />
        <Input
          id="año"
          required="true"
          label="Año"
          defaultValue={torneo ? torneo[0].año : ''}
        />
        <Input
          id="imagen_torneo"
          label="Imagen"
          defaultValue={torneo ? torneo[0].imagen_torneo : ''}
        />
        <Input
          id="fecha_inicio"
          label="Fecha de inicio (yyyy-mm-dd)"
          defaultValue={
            torneo && torneo[0].fecha_inicio !== null
              ? torneo[0].fecha_inicio.substring(0, 10)
              : ''
          }
        />
        <Input
          id="fecha_finalizacion"
          label="Fecha de finalización (yyyy-mm-dd)"
          defaultValue={
            torneo && torneo[0].fecha_finalizacion !== null
              ? torneo[0].fecha_finalizacion.substring(0, 10)
              : ''
          }
        />

        <div className={classes.campo}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            rows="4"
            defaultValue={torneo ? torneo[0].descripcion : ''}
          ></textarea>
        </div>

        <div className={classes.campo}>
          <label htmlFor="id_edicion_previa">Edición anterior</label>
          <select
            id="id_edicion_previa"
            name="id_edicion_previa"
            defaultValue={
              torneo ? torneo[0].id_edicion_previa : 'sin_edicion_previa'
            }
          >
            <option value="sin_edicion_previa">No hay torneo previo</option>
            {torneos.map((torneo) => (
              <option key={torneo.id} value={torneo.id}>
                {torneo.titulo} {torneo.temporada}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.campo}>
          <label htmlFor="id_edicion_siguiente">Edición siguiente</label>
          <select
            id="id_edicion_siguiente"
            name="id_edicion_siguiente"
            defaultValue={
              torneo ? torneo[0].id_edicion_siguiente : 'sin_edicion_siguiente'
            }
          >
            <option value="sin_edicion_siguiente">
              No hay torneo siguiente
            </option>
            {torneos.map((torneo) => (
              <option key={torneo.id} value={torneo.id}>
                {torneo.titulo} {torneo.temporada}
              </option>
            ))}
          </select>
        </div>
      </AdminFormulario>

      {method !== 'POST' && (
        <>
          <AdminTituloPagina
            titulo="Categorías"
            to="categorias/nuevo"
            textoInterno="Agregar Categoría"
          />
          <AdminTablaPagina
            array={categoriasTorneo}
            controladorBorrarElemento={controladorBorrarCategoriaTorneo}
            encabezadosColumnas={['categoria', 'orden']}
            mostrarCantidadEntradasYFiltro={false}
            prefijoLinkEditar="categorias/"
          />
          <button>Agregar fecha</button>
        </>
      )}
    </>
  );
};

export default FormularioTorneo;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosTorneo = {
    titulo: data.get('titulo'),
    temporada: data.get('temporada'),
    año: data.get('año'),
    imagen_torneo: data.get('imagen_torneo'),
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    descripcion: data.get('descripcion'),
    id_edicion_previa:
      data.get('id_edicion_previa') !== 'sin_edicion_previa'
        ? data.get('id_edicion_previa')
        : null,
    id_edicion_siguiente:
      data.get('id_edicion_siguiente') !== 'sin_edicion_siguiente'
        ? data.get('id_edicion_siguiente')
        : null,
    slug:
      method === 'POST'
        ? `${obtenerSlug(data.get('titulo'))}-${obtenerSlug(
            data.get('temporada')
          )}`
        : '',
  };

  if (method === 'POST') {
    return crearTorneo(datosTorneo);
  }

  return editarTorneo(params.idTorneo, datosTorneo);
}
