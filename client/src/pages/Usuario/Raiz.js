import { Outlet, useLoaderData } from 'react-router-dom';

import Header from '../../components/Usuario/Layout/Header/Header';
import Footer from '../../components/Usuario/Layout/Footer/Footer';
import { obtenerStreamActivo } from '../../api';

const RootLayout = () => {
  const streamActivo = useLoaderData();

  return (
    <>
      <Header streamActivo={streamActivo} />
      <main className="main-usuario">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

export function loader() {
  return obtenerStreamActivo();
}
