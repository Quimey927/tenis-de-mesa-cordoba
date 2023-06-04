import Header from '../../components/Usuario/Layout/Header/Header';
import Footer from '../../components/Usuario/Layout/Footer/Footer';

const PaginaError = () => {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-center">¡Ha ocurrido un error!</h1>
        <p className="text-center">No pudimos encontrar esta página.</p>
      </main>
      <Footer />
    </>
  );
};

export default PaginaError;
