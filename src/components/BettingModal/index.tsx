import classes from './BettingModal.module.scss';

// Assets
import check from 'assets/check.png';
import danger from 'assets/danger.png'
import Spinner from 'components/Common/Spinner';

const BettingModal = (props: { show: any; loading?: boolean; txStatus?: boolean }) => {
  const { show, loading, txStatus } = props;

  const showHideClassName = show
    ? `${classes.modal} ${classes.displayBlock}`
    : `${classes.modal} ${classes.displayNone}`;

  return (
    <div className={showHideClassName}>
      {loading ? (
        <>
          <Spinner />
          <br />
          <p className={classes.bettingId}> Transaction in progress </p>
        </>
      ) : txStatus ? (
        <>
          <img src={check} alt="check" />
          <p className={classes.bettingTitle}>Transaction Success</p>
        </>
      ) :
      (
        <>
          <img src={danger} alt="failure" />
          <p className={classes.bettingTitle}>Transaction Failure</p>
        </>
      )}
    </div>
  );
};

export default BettingModal;
