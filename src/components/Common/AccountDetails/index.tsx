import classes from './AccountDetails.module.scss';

// Assets
import upload from 'assets/upload.png';
import { useToken } from '../../../contexts/Token';
import { useMetamask } from '../../../contexts/Metamask';

const AccountDetails = () => {
  const { balance, price, address } = useToken();
  const { account } = useMetamask();

  const onCopy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className={classes.descriptionHead}>
      <p className={classes.bundle}>
        {(balance * price).toLocaleString()} $BUND
        <span>{balance.toLocaleString()}</span>
      </p>
      <p className={classes.balance}>
        Current Balance
        <span className={classes.bal}>
          {`${account.substring(0, 10)}.....${account.substring(account.length - 5, account.length)}`}
          <img className={classes.copy} src={upload} alt="upload" />
        </span>
      </p>
    </div>
  );
};

export default AccountDetails;
