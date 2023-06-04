import { Outlet } from 'react-router-dom';

import Header from '../../components/Usuario/Layout/Header/Header';
import Footer from '../../components/Usuario/Layout/Footer/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="main-usuario">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
