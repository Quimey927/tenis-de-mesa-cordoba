import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setForm((prevForm) => {
      const newForm = { ...prevForm, [evt.target.name]: evt.target.value };
      return newForm;
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (form.password !== 'santi.lorenzo') {
      alert('La contraseña es incorrecta');
      return;
    }

    localStorage.setItem('token', 'santi.lorenzo');

    navigate('/admin');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        type="password"
        label="Contraseña"
        id="password"
        onChange={handleChange}
      />
      <Button type="submit">Ingresar</Button>
    </form>
  );
};

export default Login;
