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
  const { leagues, isLoading } = useAppData();

  // Modal Control System.
  const [isCreateLeagueFormOpened, setIsCreateLeagueOpened] = useState(false);

  return (
    <Fragment>
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn} onClick={() => console.log('View Button Clicked')}>
          View All Leagues
        </button>
        <button className={classes.addBtn} onClick={() => setIsCreateLeagueOpened(true)}>
          Add New League
        </button>
      </div>

      {/* Bottom Section (Table). */}
      {isLoading.leagues ? (
        <div className={classes.center}>
          <Spinner />
        </div>
      ) : (
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
              {leagues.map((league, index) => (
                <tr key={index}>
                  <td>
                    <img src={sportImage(league.sport)} alt="League" />
                  </td>
                  <td>
                    <p className={classes.sportsName}>{league?.sport.toUpperCase()}</p>
                  </td>
                  <td>
                    <p className={classes.leagueName}>{league?.displayName.toUpperCase()}</p>
                    <span className={`${classes.subHeaders} ${classes.muted}`}>{league.description}</span>
                  </td>
                  <td>
                    <p className={classes.seasons}>{league.season}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Section */}
      <Modal
        isOpen={isCreateLeagueFormOpened}
        close={() => setIsCreateLeagueOpened(false)}
        title="Create League">
        <CreateLeagueForm closeFormModal={() => setIsCreateLeagueOpened(false)} />
      </Modal>
      <Modal isOpen={false} border="none">
        {/* LeagueModifyResult Should has Status Props with The Functionality */}
        <LeagueModifyResult />
      </Modal>
    </Fragment>
  );
};

export default League;
