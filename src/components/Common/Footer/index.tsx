import classes from './Footer.module.scss';

// Assets
import { ReactComponent as Play } from 'assets/play.svg';
import { ReactComponent as Linkedin } from 'assets/linkedin.svg';
import { ReactComponent as Twitter } from 'assets/twitter.svg';
import { ReactComponent as Facebook } from 'assets/facebook.svg';

const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <p className={classes.footerTitle}>BUNDLES BETS</p>
      <p className={classes.copyright}>&copy;{new Date().getFullYear()} Bundles Bets</p>
      <p className={classes.iconsContainer}>
        <a href="https://nonceblox.com/" className={classes.icon}>
          <Play />
        </a>
        <a href="https://nonceblox.com/" className={classes.icon}>
          <Linkedin />
        </a>
        <a href="https://nonceblox.com/" className={classes.icon}>
          <Twitter />
        </a>
        <a href="https://nonceblox.com/" className={classes.icon}>
          <Facebook />
        </a>
      </p>
    </div>
  );
};

export default Footer;
