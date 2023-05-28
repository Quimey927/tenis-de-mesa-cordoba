import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../../components/Admin/Login/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === 'santi.lorenzo') {
      navigate('/admin');
    }
  }, [navigate]);

  return <Login />;
};

export default LoginPage;
