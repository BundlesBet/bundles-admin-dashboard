import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MetamaskProvider from './contexts/Metamask';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppDataProvider from 'contexts/AppData';
// import { MoralisProvider } from 'react-moralis';
// import { moralisParams } from 'config';
toast.configure({ theme: 'colored' });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MetamaskProvider>
        {/* <MoralisProvider serverUrl={moralisParams.serverUrl} appId={moralisParams.appId}> */}
        {/* <AppDataProvider> */}
        <App />
        {/* </AppDataProvider> */}
        {/* </MoralisProvider> */}
      </MetamaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
