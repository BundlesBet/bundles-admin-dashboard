import styles from './globals.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetamaskProvider from 'contexts/Metamask';
// import Layout from "components/Layout";
toast.configure({ theme: 'colored', limit: 2 });

type AppProps = {
  Component: any;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <Component {...pageProps} />
    </MetamaskProvider>
  );
}

export default MyApp;
