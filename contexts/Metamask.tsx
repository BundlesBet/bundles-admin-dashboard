import { createContext, useContext, useState, useEffect } from 'react';

// hooks
import useSwitch from 'hooks/useSwitch';
import useForceUpdate from 'hooks/useForceUpdate';
import usePersistentToast from 'hooks/usePersistentToast';

// libraries
import { toast } from 'react-toastify';

// components
import Modal from 'components/Modal';

// helpers
import Web3 from 'helpers/web3';
import Contracts from 'helpers/contracts';

// config
import { allowedChains } from 'config';

const { ethereum } = window as any;

const MetamaskContext = createContext({
  account: '',
  disconnect: () => {},
  connect: () => {},
  isConnectedToAllowedNetwork: async () => false,
  handleTransactionError: (err: any) => {},
  refresh: {
    rerender: () => {},
    triggerValue: 0,
  },
});

export const useMetamask = () => useContext(MetamaskContext);

const isConnectedToAllowedNetwork = async () => {
  const chainId = parseInt(await ethereum?.request({ method: 'eth_chainId' }));
  return !(allowedChains.length > 0 && !allowedChains.find((chain) => chain.id === chainId));
};

const MetamaskProvider = ({ children }: any) => {
  const forceUpdate = useForceUpdate();
  const [account, setAccount] = useState<string>('');

  const isTransactionErrorModalOpen = useSwitch();
  const [transactionErrorMessage, setTransactionErrorMessage] = useState('');

  const persistentSwitchChainToast = usePersistentToast(
    'Please connect to one of the supported chains',
    'error',
  );

  const persistentWeb3BrowserToast = usePersistentToast(
    'Ensure you are using a Web3 enabled browser',
    'error',
  );

  const connect = async () => {
    if (!Web3.isEnabled()) return persistentWeb3BrowserToast.trigger();

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const { Prediction } = Contracts.instances;
      const value = await Prediction.methods.isAdmin(accounts[0]).call();
      const isOwner = (await Prediction.methods.owner().call()).toLowerCase() == accounts[0].toLowerCase();
      if (value || isOwner) {
        setAccount(accounts[0]);
      } else {
        toast.error('Connected user is not admin');
        setAccount('');
      }
    } catch (e: any) {
      switch (e.code) {
        case 4001:
          toast.info('Please connect to Metamask');
          break;
        case -32002:
          toast.info('Please open Metamask');
          break;
      }
    }
  };

  const disconnect = () => {
    setAccount('');
    forceUpdate.rerender();
  };

  const refresh = async () => {
    forceUpdate.rerender();
    if (await isConnectedToAllowedNetwork()) return persistentSwitchChainToast.dismiss();
    persistentSwitchChainToast.trigger();
  };

  const handleTransactionError = (err: any) => {
    const fallbackMessage = `Something went wrong. Please check the transaction in the explorer.`;

    switch (err.code) {
      case 4001:
        toast.error('Transaction was rejected by the user.');
        return;

      default:
        if (err.message) {
          try {
            const substring = err.message.substring(
              err.message.indexOf('{'),
              err.message.lastIndexOf('}') + 1,
            );
            const errorObject = JSON.parse(substring);
            const errorMessage = errorObject.originalError?.message || errorObject.value?.message;
            return toast.error(
              errorMessage.charAt(0).toUpperCase() + errorMessage.substr(1, errorMessage.length - 1),
            );
          } catch (error) {
            setTransactionErrorMessage(err.message);
            isTransactionErrorModalOpen.true();
          }
        } else {
          toast.error(fallbackMessage);
          return;
        }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!Web3.isEnabled()) return persistentWeb3BrowserToast.trigger();
      if (!(await isConnectedToAllowedNetwork())) persistentSwitchChainToast.trigger();

      ethereum.on('chainChanged', refresh);
      ethereum.on('accountsChanged', async (accounts: string[]) => {
        const { Prediction } = Contracts.instances;
        const value = await Prediction.methods.isAdmin(accounts[0]).call();
        const isOwner = (await Prediction.methods.owner().call()) == accounts[0];
        if (value || isOwner) {
          setAccount(accounts[0]);
        } else {
          toast.error('Connected user is not admin');
          setAccount('');
        }
      });
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    account,
    connect,
    disconnect,
    isConnectedToAllowedNetwork,
    handleTransactionError,
    refresh: { rerender: refresh, triggerValue: forceUpdate.triggerValue },
  };

  return (
    <>
      <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>
      <Modal isOpen={isTransactionErrorModalOpen.value} close={isTransactionErrorModalOpen.false} title="">
        <p>{transactionErrorMessage}</p>
      </Modal>
    </>
  );
};

export default MetamaskProvider;
