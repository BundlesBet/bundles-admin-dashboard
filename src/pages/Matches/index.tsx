// Libraries.
import React, { Fragment, useState, Suspense } from 'react';

// Styles.
import classes from './Matches.module.scss';

import { useAppData } from 'contexts/AppData';

import useEffectAsync from 'hooks/useEffectAsync';

// Reuseable Components.
import Modal from 'components/Modal';
import ActiveTable from './ActiveTable';
// import CreateMatchForm from './CreateMatchForm';
import Spinner from 'components/Common/Spinner';

import espn from 'api/espn';
import { leagueUrl } from 'config';
import { fetchMatchById } from 'helpers/fetchData';
const CreateMatchForm = React.lazy(() => import('./CreateMatchForm'));

const Matches = () => {
  // let { matches, setMatches, upcomingMatches, isLoading } = useAppData();
  const matches: any = [],
    activeMatches: any = [];

  // upcomingMatches = upcomingMatches.filter(
  //   (match) => !matches.find((value) => value.espnMatchId === match.id),
  // );

  // const [newMatch, setNewMatch] = useState({ league: '', espnMatchId: '' });

  // const [retries, setRetries] = useState(0);

  const [selectedMatches, setSelectedMatches] = useState([]);
  // // Modal Control System.
  // const [isCreateMatchFormOpened, setIsCreateMatchOpened] = useState(false);

  // const activeMatches = matches.filter((match) => parseFloat(`${match.startTime}`) > Date.now());

  // const inActiveMatches = matches.filter((match) => parseFloat(`${match.startTime}`) < Date.now());
  // // const [isResultOpened, setIsResultOpened] = useState(true);

  // // console.log(matches);

  // useEffectAsync(async () => {
  //   // if (!account) return;

  //   if (
  //     newMatch.espnMatchId != '' &&
  //     matches.filter((match) => match.espnMatchId === newMatch.espnMatchId).length == 0
  //   ) {
  //     try {
  //       const timer = setTimeout(async () => {
  //         let data = await fetchMatchById(newMatch.espnMatchId);
  //         if (data.length > 0) {
  //           let eventUrl = leagueUrl(newMatch.league.toLowerCase(), newMatch.espnMatchId);
  //           let _newMatch: any;
  //           let matchData: any;
  //           if (eventUrl) {
  //             matchData = await espn.match(eventUrl);
  //           }
  //           _newMatch = { ...matchData, ...data[0], ['startTime']: matchData?.match?.startTime };
  //           setMatches([...matches, _newMatch]);
  //         }
  //       }, 15000);
  //       return () => clearTimeout(timer);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [newMatch]);

  // Tabs Control System.
  const [tabState, setTabState] = useState(1);
  const tabsSwitcher = (index: number) => {
    switch (index) {
      case 1:
        return (
          <ActiveTable
            _matches={activeMatches}
            // setMatches={setMatches}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            tabState={tabState}
          />
        );
      // case 2:
      //   return (
      //     <ActiveTable
      //       matches={activeMatches}
      // selectedMatches={selectedMatches}
      // setSelectedMatches={setSelectedMatches}
      //     />
      //   );
      case 2:
        return (
          <ActiveTable
            _matches={matches}
            // setMatches={setMatches}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            tabState={tabState}
          />
        );
      case 3:
        return (
          <ActiveTable
            _matches={matches}
            // setMatches={setMatches}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            tabState={tabState}
          />
        );
      case 4:
        return (
          <ActiveTable
            _matches={matches}
            // setMatches={setMatches}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            tabState={tabState}
          />
        );
    }
  };

  return (
    <Fragment>
      {/* Upper Section. */}
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn} onClick={() => console.log('View Button Clicked')}>
          Matches
        </button>
        <button className={classes.addBtn} onClick={() => {}}>
          Add New Match
        </button>
      </div>

      {/* Bottom Section (Table). */}
      <div className={classes.resultContainer}>
        <div className={classes.tabsButtonsContainer}>
          <button className={classes.activeTab}>Active</button>
          {/* <button
              className={tabState === 1 ? `${classes.tabButton} ${classes.activeTab}` : classes.tabButton}
              onClick={() => setTabState(2)}>
              Upcoming
            </button> */}
          <button className={classes.tabButton}>Upcoming</button>
          <button className={classes.tabButton}>Ended</button>
          <button className={classes.tabButton}>ShowAll({matches.length})</button>
        </div>
        {tabsSwitcher(tabState)}
      </div>

      {/* Modal Section */}
      <Modal isOpen={false} close={() => {}} title="Add Match">
        <Suspense fallback={<Spinner className={'centerSpinner'} />}>
          <CreateMatchForm closeFormModal={() => {}} />
        </Suspense>
      </Modal>
    </Fragment>
  );
};

export default Matches;
