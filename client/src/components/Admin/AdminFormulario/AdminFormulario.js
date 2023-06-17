import { Form, useNavigate, useNavigation } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import Button from '../../UI/Button/Button';
import classes from './AdminFormulario.module.css';

const AdminFormulario = ({
  children,
  method,
  textoTitulo,
  subtitulo = '',
  navegarAlCancelar = '..',
}) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const controladorCancelar = () => {
    navigate(navegarAlCancelar);
  };

  return (
    <>
      <AdminTituloPagina titulo={textoTitulo} subtitulo={subtitulo} />

      <Form method={method} className={classes.form}>
        {children}

        <div className={classes.acciones}>
          <Button
            className={classes.cancelar}
            onClick={controladorCancelar}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            className={classes.aceptar}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Subiendo...'
              : method === 'POST'
              ? 'Agregar'
              : 'Guardar'}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AdminFormulario;
