import axios from 'axios';
// Libraries.
import React, { Fragment, useState, useEffect, useCallback, useRef, Suspense } from 'react';
// import { fetchSports } from 'api';
// Styles.
import classes from './League.module.scss';

import { sportImage } from 'config';

import moment from 'moment';

// Reuseable Components.
import Modal from 'components/Modal';
import CreateLeagueForm from './CreateLeagueForm';
import LeagueModifyResult from './LeagueModifyResult';
// import { useAppData } from 'contexts/AppData';
import Spinner from 'components/Common/Spinner';

const CreatePoolForm = React.lazy(() => import('../Matches/CreatePoolForm'));

const League = () => {
  // const { leagues, isLoading } = useAppData();
  const [sports, setSports] = useState<any>([]);
  const [sport, setSport] = useState<string>('');
  const [leagues, setLeagues] = useState<any>([]);
  const [matches, setMatches] = useState<any>([]);
  const [league, setLeague] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMatches, setSelectedMatches] = useState<any>([]);
  const [isCreatePoolFormOpened, setIsCreatePoolOpened] = useState(false);
  // // Modal Control System.
  const [isCreateLeagueFormOpened, setIsCreateLeagueOpened] = useState(true);
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const fetchSports = useCallback(async () => {
    setIsLoading(true);
    try {
      //prettier-ignore
      const {data:{sportsData:{items}}} = await axios(`${process.env.REACT_APP_BACKEND_URL}/admin/getSports`);
      console.log(items);
      setSports(items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchLeagues = useCallback(async () => {
    try {
      if (!sport) return;
      setIsLoading(true);
      //prettier-ignore
      const {data:{leaguesData:{leagues:{items}}}} = await (await axios(`${process.env.REACT_APP_BACKEND_URL}/admin/getLeagues/${sport}`));
      setLeagues(items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [sport]);

  const fetchMatches = useCallback(async () => {
    try {
      if (!league) return;
      setIsLoading(true);
      //prettier-ignore
      const {data:{matchesData}} = await (await axios(`${process.env.REACT_APP_BACKEND_URL}/admin/fetchMatchesData/${sport}/${league}`));
      setMatches(matchesData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [league]);

  const handleDropDownChange = (e: any) => {
    if (e.target.name === 'selectedSport') {
      console.log('setting sport');
      setSport(e.target.value);
    }
    if (e.target.name === 'selectedLeague') {
      console.log('setting league');
      setLeague(e.target.value);
    }
  };

  const handleOnChange = (checkedMatch: any) => {
    const matchExists = selectedMatches.some(
      (selectedMatch: any) => selectedMatch.match.id === checkedMatch.match.id,
    );
    if (matchExists) {
      const filteredMatches = selectedMatches.filter(
        (existingMatch: any) => existingMatch.match.id !== checkedMatch.match.id,
      );
      setSelectedMatches(filteredMatches);
    } else {
      setSelectedMatches([...selectedMatches, checkedMatch]);
    }
  };

  useEffect(() => {
    if (sports.length > 0) return;
    fetchSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSports]);

  useEffect(() => {
    fetchLeagues();
  }, [sport, fetchLeagues]);

  useEffect(() => {
    fetchMatches();
  }, [league, fetchMatches]);

  return (
    <Fragment>
      <div className={classes.selectWrapper}>
        <select
          name="selectedSport"
          id="sportSelect"
          className={classes.sportSelect}
          defaultValue="select_sport"
          onChange={handleDropDownChange}>
          <option value="select_sport" disabled>
            Select Sport
          </option>
          {isLoading && (
            <option value="select_sport" disabled>
              <Spinner />
            </option>
          )}

          {sports.length &&
            sports.map((sport: any, index: number) => {
              const { name, slug } = sport;
              return (
                <option key={index} value={slug}>
                  {name}
                </option>
              );
            })}
        </select>
      </div>
      <div className={classes.selectWrapper}>
        <select
          name="selectedLeague"
          id="sportLeague"
          className={classes.sportSelect}
          defaultValue="select_league"
          onChange={handleDropDownChange}>
          <option value="select_league" disabled>
            Select League
          </option>
          {leagues.length &&
            leagues?.map((sport: any, index: number) => {
              const { name, slug } = sport;
              return (
                <option key={index} value={slug}>
                  {name}
                </option>
              );
            })}
        </select>
      </div>
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn}>All Matches</button>
        {/* <button className={classes.addBtn}>Add New League</button> */}
      </div>

      {isLoading && <Spinner className="centerSpinner" />}
      {matches.length > 0 && (
        <div className={classes.resultContainer}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Sports</th>
                <th>League Name</th>
                <th>Match</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {matches?.length &&
                matches?.map((match: any, index: number) => {
                  //prettier-ignore
                  const {match:{startTime, id}} = match;
                  //prettier-ignore
                  const {teams:{a:teamA, b:teamB}} = match;
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          className={`${classes.textInput} ${classes.displayBlock}`}
                          type="checkbox"
                          // name="selectedMatch"
                          // checked={selectedMatches.find((selectedMatch: any) => selectedMatch.id === id)}
                          // // name="selectedMatch"
                          // onChange={(e: any) => {
                          //   e.target.checked
                          //     ? setSelectedMatches([...selectedMatches, match] as any)
                          //     : setSelectedMatches((selectedMatches: any) =>
                          //         selectedMatches.filter((selectedMatch: any) => selectedMatch.id !== id),
                          //       );
                          // }}
                          ref={checkboxRef}
                          checked={selectedMatches.find(
                            (selectedMatch: any) => selectedMatch.match.id === id,
                          )}
                          onChange={() => handleOnChange(match)}
                        />
                      </td>

                      <td>
                        <img src={sportImage('soccer')} alt="Match" />
                      </td>

                      <td className={classes.leagueName}>
                        <p>{league}</p>
                      </td>

                      <td>
                        <div className={classes.matchTeams}>
                          <div className={classes.homeTeam}>
                            <p>{teamA.name}</p> <img src={teamA.logo} alt="Home-Team-Flag" />
                          </div>

                          <span>VS</span>

                          <div className={classes.awayTeam}>
                            <img src={teamB.logo} alt="Home-Team-Flag" /> <p>{teamB.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className={classes.matchDateTime}>
                        <p>{moment(parseFloat(`${startTime}`)).format('MM-DD-YYYY HH:MM')}</p>
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
                  );
                })}
              {/* <tr key={0}>
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
              </tr> */}
            </tbody>
          </table>
          <button
            className={`${classes.addBtn} ${classes.displayBlock}`}
            disabled={!(selectedMatches.length > 0)}
            onClick={() => setIsCreatePoolOpened(true)}>
            Add New Pool
          </button>
        </div>
      )}

      <Suspense fallback={<Spinner className={'centerSpinner'} />}>
        <Modal isOpen={isCreatePoolFormOpened} close={() => setIsCreatePoolOpened(false)} title="Add Pool">
          <CreatePoolForm
            closeFormModal={() => setIsCreatePoolOpened(false)}
            selectedMatches={selectedMatches}
            sport={sport}
            league={league}
          />
        </Modal>
      </Suspense>

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
