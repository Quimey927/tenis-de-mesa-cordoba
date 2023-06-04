import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import AdminNavbar from '../../components/Admin/AdminNavbar/AdminNavbar';
import useObtenerAnchoVentana from '../../hooks/useObtenerAnchoVentana';
import classes from './RaizAdmin.module.css';

const RaizAdmin = () => {
  const anchoVentana = useObtenerAnchoVentana();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== 'santi.lorenzo') {
      navigate('/admin/login');
    }
  }, [navigate, token]);

  if (anchoVentana < 768) {
    return (
      <>
        {token && <AdminHeader />}
        {token && <AdminNavbar />}
        <main className={classes['main-mobile']}>
          <Outlet />
        </main>
      </>
    );
  }

  return (
    <>
      {token && <AdminHeader />}
      <main className={token ? classes['main-desktop'] : ''}>
        {token && <AdminNavbar />}
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default RaizAdmin;
