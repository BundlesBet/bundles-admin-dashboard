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
  console.log(pools);
  let navigate = useNavigate();
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Pool Id</th>
            <th>Pool League</th>
            <th>Pool Name</th>
            <th>Pool Start Time</th>
            <th>Pool End Time</th>
            <th>Pool Fee</th>
            <th>Reward</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pools.length &&
            pools.map((pool: any, index: number) => {
              const { id, fee, reward, poolName, leagueName, startTime, endTime } = pool;
              return (
                <tr key={index}>
                  <td className={classes.poolsTableRowData}>
                    <p className={classes.poolName}>{id}</p>
                  </td>
                  {/* ----------------------------------- */}
                  <td>
                    <p className={classes.poolCreated}>{leagueName}</p>
                  </td>
                  <td>
                    <p className={classes.poolCreated}>{poolName}</p>
                  </td>
                  <td>
                    <p className={classes.poolCreated}>{moment(startTime).format('MM-DD-YYYY')}</p>
                  </td>
                  <td>
                    <p className={classes.poolName}>{moment(endTime).format('MM-DD-YYYY')}</p>
                  </td>
                  <td>
                    <p className={classes.poolName}>{fee}</p>
                  </td>
                  <td>
                    <p className={classes.poolName}>{reward}</p>
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
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ActiveTable;
