import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ErrorPage = () => {
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

export default ErrorPage;
