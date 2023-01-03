import classes from './Navbar.module.scss';

// contexts
import { useMetamask } from 'contexts/Metamask';

// Assets
import Logo from 'assets/green_logo.png';

import { useToken } from '../../../contexts/Token';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { account } = useMetamask();
  const { balance, price } = useToken();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        <img src={Logo} width={60} />
        <span>BUNDLES</span>
        BETS
      </h1>
      <div className={classes.contents}>
        <div className={classes.dropdown}>
          <p className={classes.name} onClick={() => navigate('/dashboard')}>
            <span>
              {`${account.substring(0, 10)}.....${account.substring(account.length - 5, account.length)}`}
            </span>
          </p>

          <div className={classes.dropdownContent}>
            <p className={classes.balance}>Current Balance</p>
            <p className={classes.data}>
              {(balance * price).toLocaleString()} USD
              <br />
              <span>{balance.toLocaleString()} BUND</span>
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
