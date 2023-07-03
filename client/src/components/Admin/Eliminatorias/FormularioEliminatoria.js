import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Textarea from '../../UI/Textarea/Textarea';
import { editarEliminatoria } from '../../../api';

const FormularioEliminatoria = ({ method, eliminatoria }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? 'Agregar eliminatoria' : 'Editar descripción'
      }
      navegarA={'..'}
    >
      <Textarea
        id="descripcion"
        label="Descripción"
        placeholder="Añadir descripción"
        defaultValue={eliminatoria ? eliminatoria[0].descripcion : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioEliminatoria;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const { idFecha, idCategoriaFecha, idFase, idEliminatoria } = params;

  const datosEliminatoria = {
    descripcion: data.get('descripcion'),
    fase_id: idFase,
  };

  if (method === 'PUT') {
    return editarEliminatoria(
      idEliminatoria,
      datosEliminatoria,
      idCategoriaFecha,
      idFecha,
      idFase
    );
  }
}
