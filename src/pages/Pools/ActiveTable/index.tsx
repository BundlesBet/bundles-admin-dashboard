// Libraries.
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// Styles.
import classes from './ActiveTable.module.scss';

// Assets.
import EditIcon from '../../../assets/edit.png';
import DeleteIcon from '../../../assets/trashcan.png';

import BaseballImg from 'assets/baseball.png';
import BasketballImg from 'assets/basketball.svg';
import CricketImg from 'assets/cricket.png';
import FootballImg from 'assets/football.png';
import RugbyImg from 'assets/rugby.png';
import ChessImg from 'assets/chess.png';
import HockeyImg from 'assets/hockey.png';
import Web3 from 'helpers/web3';

interface ModalProps {
  tabState: number;
  pools: {
    id: number;
    img?: string;
    startTime: string;
    endTime: string;
    fee: string;
    totalParticipants: string;
    matches: [
      {
        id: number;
        espnMatchId: number;
        league: {
          id: string;
          name: string;
          sport: string;
        };
      },
    ];
  }[];
}

const ActiveTable = (props: ModalProps) => {
  const { pools, tabState } = props;

  let navigate = useNavigate();
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Pool Id</th>
            <th>Pool Start Time</th>
            <th>Pool End Time</th>
            <th>Total Participants</th>
            <th>Pool Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tabState !== 3 && (
            <tr key={0}>
              <td className={classes.poolsTableRowData}>
                <p className={classes.poolName}>LEAGUE_NAME 01-01-2023</p>
              </td>
              {/* ----------------------------------- */}
              <td>
                <p className={classes.poolCreated}>01-01-2023</p>
              </td>
              <td>
                <p className={classes.poolCreated}>01-01-2023</p>
              </td>
              <td>
                <p className={classes.poolCreated}>0</p>
              </td>
              <td>
                <p className={classes.poolName}>0 BUND</p>
              </td>
              <td>
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/reward`)}>
                  Reward
                </button>
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/grade`)}>
                  Grade
                </button>
                {/* {tabState === 1 && ( */}
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/update`)}>
                  Edit
                </button>
                {/* )} */}
              </td>
            </tr>
          )}
          {tabState === 3 && (
            <tr key={0}>
              <td className={classes.poolsTableRowData}>
                <p className={classes.poolName}>LEAGUE_NAME 01-01-2023</p>
              </td>
              <td>
                <p className={classes.poolCreated}>01-01-2023</p>
              </td>
              <td>
                <p className={classes.poolCreated}>01-01-2023</p>
              </td>
              <td>
                <p className={classes.poolCreated}>0</p>
              </td>
              <td>
                <p className={classes.poolName}>0 BUND</p>
              </td>
              <td>
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/reward`)}>
                  Reward
                </button>
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/grade`)}>
                  Grade
                </button>
                <button className={classes.actionBtn} onClick={() => navigate(`/pools/1/update`)}>
                  Edit
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ActiveTable;
