import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';

const RootLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== 'santi.lorenzo') {
      navigate('/admin/login');
    }
  }, [navigate, token]);

  return (
    <>
      {token && <AdminHeader />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
