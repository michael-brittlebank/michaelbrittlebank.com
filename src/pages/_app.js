import '../styles/app.scss';
import Header from '../components/header';
import Footer from '../components/footer';

function AppContainer({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default AppContainer;
