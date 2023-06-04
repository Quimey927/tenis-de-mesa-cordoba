import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';

const Login = () => {
  const [valoresIngresados, setValoresIngresados] = useState({
    usuario: '',
    contraseña: '',
  });

  const navigate = useNavigate();

  const controladorCambio = (evt) => {
    setValoresIngresados((valoresPrevios) => {
      const nuevosValores = {
        ...valoresPrevios,
        [evt.target.name]: evt.target.value,
      };
      return nuevosValores;
    });
  };

  const controladorSubmit = async (evt) => {
    evt.preventDefault();

    if (
      valoresIngresados.usuario.trim() === '' ||
      valoresIngresados.contraseña.trim() === ''
    ) {
      alert('No dejés campos vacíos');
      return;
    }

    if (
      valoresIngresados.usuario !== 'Quimey' ||
      valoresIngresados.contraseña !== 'santi.lorenzo'
    ) {
      alert('El usuario o la contraseña son incorrectos');
      return;
    }

    localStorage.setItem('usuario', 'Quimey');
    localStorage.setItem('token', 'santi.lorenzo');

    navigate('/admin');
  };

  return (
    <form className={classes.form} onSubmit={controladorSubmit}>
      <Input
        label="Usuario"
        id="usuario"
        autoFocus="true"
        onChange={controladorCambio}
      />
      <Input
        type="password"
        label="Contraseña"
        id="contraseña"
        onChange={controladorCambio}
      />
      <Button type="submit">Ingresar</Button>
    </form>
  );
};

export default Login;
