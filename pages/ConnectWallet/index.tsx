// contexts
import { useMetamask } from 'contexts/Metamask';

// assets
import Logo from 'assets/green_logo.png';
import { ReactComponent as Wallet } from 'assets/wallet.svg';
import topRight from 'assets/topRight.png';
import bottomLeft from 'assets/bottomLeft.png';

// styles
import styles from './ConnectWallet.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contracts from 'helpers/contracts';
import { toast } from 'react-toastify';

const Home = () => {
  const { connect } = useMetamask();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <>
      <img src={topRight} alt="topRight" className={styles.topright} />
      <img src={bottomLeft} alt="bottomLeft" className={styles.bottomleft} />
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>
          <img src={Logo} width={80} />
          <span>BUNDLES</span>
          BETS
        </h1>
        <p className={styles.description}>
          <span>Welcome to the future</span>
          <br />
          Blockchain Betting
        </p>
        <button className={styles.wallet} onClick={connect}>
          <Wallet />
          <span>Connect your Wallet</span>
        </button>
        <p className={styles.text}>&copy;{new Date().getFullYear()} Bundles Bets | Beta Release</p>
        <div className={styles.line}></div>
      </div>
    </>
  );
};

export default Home;
