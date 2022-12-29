// Libraries.
import { Fragment, useState } from 'react';

// Styles.
import classes from './League.module.scss';

import { sportImage } from 'config';

// Reuseable Components.
import Modal from 'components/Modal';
import CreateLeagueForm from './CreateLeagueForm';
import LeagueModifyResult from './LeagueModifyResult';
import { useAppData } from 'contexts/AppData';
import Spinner from 'components/Common/Spinner';

const League = () => {
  // const { leagues, isLoading } = useAppData();

  // // Modal Control System.
  const [isCreateLeagueFormOpened, setIsCreateLeagueOpened] = useState(true);

  return (
    <Fragment>
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn}>View All Leagues</button>
        <button className={classes.addBtn}>Add New League</button>
      </div>

      {/* Bottom Section (Table). */}
      <div className={classes.resultContainer}>
        <table>
          <thead>
            <tr>
              <th>Sports</th>
              <th>Sports Name</th>
              <th>League Name</th>
              <th>Season</th>
            </tr>
          </thead>
          <tbody>
            <tr key={0}>
              <td>
                <img src={sportImage('soccer')} alt="League" />
              </td>
              <td>
                <p className={classes.sportsName}>SOCCER</p>
              </td>
              <td>
                <p className={classes.leagueName}>DisplayName</p>
                <span className={`${classes.subHeaders} ${classes.muted}`}>Description</span>
              </td>
              <td>
                <p className={classes.seasons}>Season</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      <Modal isOpen={false} close={() => {}} title="Create League">
        <CreateLeagueForm closeFormModal={() => isCreateLeagueFormOpened} />
      </Modal>
      <Modal isOpen={false} border="none">
        {/* LeagueModifyResult Should has Status Props with The Functionality */}
        <LeagueModifyResult />
      </Modal>
    </Fragment>
  );
};

export default League;
