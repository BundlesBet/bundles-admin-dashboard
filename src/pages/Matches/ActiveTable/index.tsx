import moment from 'moment';
import Modal from 'components/Modal';
// import CreatePoolForm from '../CreatePoolForm';
// import UpcomingMatchesTableModal from '../UpcomingMatchesTableModal';

// Libraries.
import React, { Fragment, useEffect, useCallback, Suspense } from 'react';
import { useState } from 'react';
import useSwitch from 'hooks/useSwitch';
import { BsSortUp, BsSortDown } from 'react-icons/bs';
import Spinner from 'components/Common/Spinner';

import { useAppData } from 'contexts/AppData';
import { useMetamask } from 'contexts/Metamask';

import Contracts from 'helpers/contracts';

// Styles.
import classes from './ActiveTable.module.scss';

import { sportImage } from 'config';
import useEffectAsync from 'hooks/useEffectAsync';

const CreatePoolForm = React.lazy(() => import('../CreatePoolForm'));
const UpcomingMatchesTableModal = React.lazy(() => import('../UpcomingMatchesTableModal'));

interface ModalProps {
  _matches: {
    id: number;
    img?: string;
    league: {
      id: number;
      name: string;
      sport: string;
    };
    startTime?: string;
    teams: {
      a: {
        name: string;
        logo: string;
      };
      b: {
        name: string;
        logo: string;
      };
    };
  }[];
  setMatches: any;
  selectedMatches: any;
  setSelectedMatches: any;
  tabState: number;
}

const ActiveTable = (props: ModalProps) => {
  const { account } = useMetamask();
  const { leagues } = useAppData();
  const { _matches, setMatches, selectedMatches, setSelectedMatches, tabState } = props;

  useEffectAsync(async () => {
    setFilteredMatches(_matches);
  }, [tabState]);

  const [isCreatePoolFormOpened, setIsCreatePoolOpened] = useState(false);

  const [isUpcomingMatchTableActive, setIsUpcomingMatchTableActive] = useState(false);

  const [currentSportFilter, setCurrentSportFilter] = useState('sports');

  const [matches, setFilteredMatches] = useState(_matches);

  useEffectAsync(async () => {
    setFilteredMatches(_matches);
  }, [tabState]);

  const addMatches = async () => {
    if (!account) return;
    try {
      const { Prediction } = Contracts.instances;
      console.log(selectedMatches);
      const matches = await selectedMatches.map((value: any) => {
        console.log('okay');
        console.log(value);
        return [value.league.id, value.id];
      });
      await Prediction.methods
        .addMatches(matches)
        .send({ from: account })
        .on('receipt', (receipt) => {});
      // .on('error', () => {
      //   isTransactionInProgress.false();
      //   isTxSuccess.false();
      //   setTimeout(closeFormModal, 2000);
      // });
      // setTimeout(() => {
      //   closeFormModal();
      // }, 30000);
    } catch (error) {
      console.log(error);
      // isTransactionInProgress.false();
      // closeFormModal();
    }
  };

  const sortByFilters = useCallback(
    (e: any) => {
      let key = e.target.name;
      let value = e.target.value;
      if (key === 'sportsFilter' && value !== 'sports') {
        setCurrentSportFilter(value);
        setFilteredMatches(_matches.filter((match: any) => match.league.sport === value));
      } else {
        setFilteredMatches(_matches);
      }
    },
    [currentSportFilter],
  );

  const sortByDateTime = () => {
    matches.map((match: any) => {
      const { startTime } = match;
      const formatted = moment.unix(startTime).format('YY-MM-DD');
      console.log(formatted);
    });
  };

  console.log(matches);

  const onLeagueFilter = async (e: any) => {
    e.target.value !== 'allLeagues'
      ? setFilteredMatches(_matches.filter((value: any) => parseInt(value.league.id) == e.target.value))
      : setFilteredMatches(_matches);
    // props._matches = props._matches.filter(;
  };
  return (
    <Fragment>
      <button
        className={
          tabState == 1 || tabState == 2
            ? `${classes.addBtn} ${classes.displayBlock}`
            : `${classes.addBtn} ${classes.displayNone}`
        }
        disabled={!(selectedMatches.length > 0)}
        onClick={() => {
          if (tabState == 1) {
            return setIsCreatePoolOpened(true);
          } else if (tabState === 2) {
            return setIsUpcomingMatchTableActive(true);
          }
          // tabState == 1 ? setIsCreatePoolOpened(true) : addMatches();
        }}>
        {tabState == 1 ? 'Add New Pool' : 'Add Matches'}
      </button>
      <table className={classes.activeTable}>
        <thead>
          <tr>
            <th></th>
            <th>
              {/* league */}

              <select
                id="sportsFilter"
                name="sportsFilter"
                // value={currentSportFilter}
                onChange={sortByFilters}
                className={classes.sportsFilter}
                // onChange={onInputChange}
              >
                <option value="sports">Sports</option>
                {/* {allSports.map((sport: any, index: number) => {
                  return <option value={sport}>{sport}</option>;
                })} */}
                {/* <option value="ALLSPORTS">Sports</option>
                <option value= "BASEBALL">Baseball</option>
                <option value="HOCKEY">Hockey</option> */}
              </select>
            </th>
            <th>
              {/* league */}
              <select
                name="leagueFilter"
                id="leagueFilter"
                className={classes.leagueFilter}
                onChange={onLeagueFilter}>
                <option value="allLeagues">League</option>
                {leagues.map((league, index) => (
                  <option value={league.id}>{league?.name.toUpperCase()}</option>
                ))}
              </select>
            </th>
            <th>Match</th>
            <th>
              <div className={classes.dateTimeHead}>
                <span className={classes.dateTimeText}>Date & Time</span>
                <span className={classes.sortIcon}>
                  <BsSortUp onClick={sortByDateTime} />
                </span>
              </div>
            </th>
            {/* <th>Season</th>1 */}
            {/* <th>Start Time</th>
            <th>End Time</th> */}
          </tr>
        </thead>
        <tbody>
          {matches.map(
            (match: any, index: any) =>
              match?.teams && (
                <tr key={index}>
                  <td>
                    <input
                      className={
                        tabState == 1 || tabState == 2
                          ? `${classes.textInput} ${classes.displayBlock}`
                          : `${classes.textInput} ${classes.displayNone}`
                      }
                      type="checkbox"
                      checked={selectedMatches.find((value: any) => value.id === match.id)}
                      // name="selectedMatch"
                      onChange={(e: any) => {
                        e.target.checked
                          ? setSelectedMatches([...selectedMatches, ...[match]] as any)
                          : setSelectedMatches(selectedMatches.filter((value: any) => value.id !== match.id));
                      }}
                    />
                  </td>

                  <td>
                    <img src={sportImage(match.league.sport)} alt="Match" />
                  </td>
                  <td className={classes.leagueName}>
                    <p>{match?.league?.name.toUpperCase()}</p>
                  </td>
                  <td>
                    <div className={classes.matchTeams}>
                      <div className={classes.homeTeam}>
                        <p>{match?.teams?.a?.name}</p>{' '}
                        <img src={match?.teams?.a?.logo} alt="Home-Team-Flag" />
                      </div>
                      <span>VS</span>
                      <div className={classes.awayTeam}>
                        <img src={match?.teams?.b?.logo} alt="Home-Team-Flag" />{' '}
                        <p>{match?.teams?.b?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className={classes.matchDateTime}>
                    <p>{moment(parseFloat(`${match?.startTime}`)).format('DD-MM-YYYY HH:MM')}</p>
                  </td>
                  {/* <td className={classes.matchSeason}>
                <p>{match}</p>
              </td> */}
                  {/* <td>
                <p className={classes.matchStart}>{'09:09:00 AM'}</p>
                <span className={`${classes.subHeaders} ${classes.muted}`}>{'ddd'}</span>
              </td>
              <td>
                <p className={classes.matchEnd}>{'09:09:00 AM'}</p>
                <span className={`${classes.subHeaders} ${classes.muted}`}>{''}</span>
              </td> */}
                </tr>
              ),
          )}
        </tbody>
      </table>
      <Suspense fallback={<Spinner className={'centerSpinner'} />}>
        <Modal isOpen={isCreatePoolFormOpened} close={() => setIsCreatePoolOpened(false)} title="Add Pool">
          <CreatePoolForm
            closeFormModal={() => setIsCreatePoolOpened(false)}
            selectedMatches={selectedMatches}
          />
        </Modal>
      </Suspense>
      {/* ------------------- */}
      <Suspense fallback={<Spinner className={'centerSpinner'} />}>
        <Modal
          isOpen={isUpcomingMatchTableActive}
          close={() => setIsUpcomingMatchTableActive(false)}
          title="Add Matches">
          <UpcomingMatchesTableModal
            closeUpcomingMatchesTableModal={() => setIsUpcomingMatchTableActive(false)}
            selectedMatches={selectedMatches}
          />
        </Modal>
      </Suspense>
    </Fragment>
  );
};

export default ActiveTable;
