// Libraries
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useMetamask } from 'contexts/Metamask';

// Styles.
import classes from './Navbar.module.scss';

// Assets.
import Logo from '../../assets/logo.png';
import Person from '../../assets/person.png';
import MenuIcon from '../../assets/menu-icon.png';
import Alarm from '../../assets/alarm.png';
import { useMetamask } from 'contexts/Metamask';
// import Spinner from '../../assets/spinner.gif';

const routeLinks = [
  // { routeName: 'Dashboard', path: '/' },
  // { routeName: 'Rewards', path: '/rewards' },
  // { routeName: 'Teams', path: '/teams' },
  { routeName: 'Pools', path: '/pools' },
  { routeName: 'League', path: '/league' },
  { routeName: 'Matches', path: '/matches' },
  { routeName: 'Admin', path: '/admin' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { account } = useMetamask();

  return (
    <Fragment>
      {/* Upper Section of The Navigation Bar. */}
      <div className={classes.accountInfoContainer}>
        {/* Logo - Left Section. */}
        <div className={classes.logo}>
          <img src={Logo} alt="Application-Logo" />{' '}
          <p>
            <span>bundles</span> Admin
          </p>
        </div>

        <div className={classes.account}>
          <ul>
            <li>
              <p className={classes.walletAddress}>{account}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.linksContainer}>
        <div>
          <ul>
            {routeLinks.map(({ routeName, path }, index) => (
              <li key={index} className={pathname === path ? classes.isActive : ' '}>
                <Link to={path}>{routeName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
