import Contracts from 'helpers/contracts';
import { createContext, useContext, useState, useEffect } from 'react';
import { useMetamask } from './Metamask';
import axios from 'axios';
import { contractAddress } from 'config';

const TokenContext = createContext({
  balance: 0,
  price: 0,
  balanceInUsd: 0,
  address: contractAddress.Token,
  tokensTransferred: {
    value: 0,
    update: (tokens: number) => {},
  },
});

export const useToken = () => useContext(TokenContext);

export default function TokenProvider({ children }: any) {
  const [balance, setBalance] = useState(0);
  const [price, setPrice] = useState(0);
  const [tokensTransferred, setTokensTransferred] = useState(0);

  const { account, refresh } = useMetamask();

  useEffect(() => {
    if (!account) return;

    axios.get('https://api.coingecko.com/api/v3/coins/bundles').then((res) => {
      setPrice(res.data.market_data.current_price.usd);
    });

    Contracts.instances.Token.methods
      .balanceOf(account)
      .call()
      .then((balance) => {
        setBalance(parseFloat(balance) / 1e18);
      });
  }, [account, refresh.triggerValue]);

  return (
    <TokenContext.Provider
      value={{
        balance,
        price,
        balanceInUsd: balance * price,
        address: contractAddress.Token,
        tokensTransferred: { value: tokensTransferred, update: setTokensTransferred },
      }}>
      {children}
    </TokenContext.Provider>
  );
}
