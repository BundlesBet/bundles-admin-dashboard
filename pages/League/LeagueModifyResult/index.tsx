// Libraries.
import { Fragment } from 'react';

// Styles.
import classes from './LeagueModifyResult.module.scss';

// Assets.
import CheckedIcon from '../../../assets/checked.png';
import RedCheckedIcon from '../../../assets/checked_red.png';

const LeagueModifyResult = (props: any) => {
  return (
    <div className={classes.modalContent}>
      <Fragment>
        <img
          src={props.status === 'created' || props.status === 'updated' ? CheckedIcon : RedCheckedIcon}
          alt="success"
        />
        <p
          className={
            props.status === 'created' || props.status === 'updated'
              ? `${classes.createdOrUpdated}`
              : `${classes.deleted}`
          }>
          {props.status === 'created'
            ? 'League Created'
            : props.status === 'updated'
            ? 'League Updated'
            : 'League Deleted'}
        </p>
        <span>Success</span>
        <p className={classes.muted}>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
      </Fragment>
    </div>
  );
};

export default LeagueModifyResult;
