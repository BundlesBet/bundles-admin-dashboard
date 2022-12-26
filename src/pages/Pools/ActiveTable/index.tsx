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
          {tabState !== 3 &&
            pools
              .filter((pool) => parseInt(pool.totalParticipants) > 0)
              .map((pool, index) => {
                return (
                  <tr key={index}>
                    {/* <td>
                    <p className={classes.poolName}>
                      {/* #{pool.id} */}
                    {/* {pool.matches?.[0]?.league?.name.toUpperCase()} */}
                    {/* {moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')} */}
                    {/* </p> */}
                    {/* </td> */}
                    {/* ----------------------------------- */}
                    {new Set(pool.matches.map((match: any) => match?.league?.id)).size == 1 ? (
                      <td className={classes.poolsTableRowData}>
                        <p className={classes.poolName}>
                          {pool.matches?.[0]?.league?.name.toUpperCase()}
                          {moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')}
                        </p>
                      </td>
                    ) : (
                      <td className={classes.poolsTableRowData}>
                        <p className={classes.poolName}>
                          Mixed{moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')}
                        </p>
                      </td>
                    )}
                    {/* ----------------------------------- */}
                    <td>
                      <p className={classes.poolCreated}>
                        {moment(parseFloat(`${pool.startTime}000`)).format('DD-MM-YYYY HH:mm')}
                      </p>
                    </td>
                    <td>
                      <p className={classes.poolCreated}>
                        {moment(parseFloat(`${pool.endTime}000`)).format('DD-MM-YYYY HH:mm')}
                      </p>
                    </td>
                    <td>
                      <p className={classes.poolCreated}>{pool.totalParticipants}</p>
                    </td>
                    <td>
                      <p className={classes.poolName}>{Web3.instance.utils.fromWei(pool.fee)} BUND</p>
                    </td>
                    <td>
                      <button
                        className={classes.actionBtn}
                        onClick={() => navigate(`/pools/${pool.id}/reward`)}>
                        Reward
                      </button>
                      <button
                        className={classes.actionBtn}
                        onClick={() => navigate(`/pools/${pool.id}/grade`)}>
                        Grade
                      </button>
                      {/* {tabState === 1 && ( */}
                      <button
                        className={classes.actionBtn}
                        onClick={() => navigate(`/pools/${pool.id}/update`)}>
                        Edit
                      </button>
                      {/* )} */}
                    </td>
                  </tr>
                );
              })}
          {tabState === 3 &&
            pools.map((pool, index) => {
              return (
                <tr key={index}>
                  {/* <td>
                      <p className={classes.poolName}>
                        {/* #{pool.id} */}
                  {/* {pool.matches?.[0]?.league?.name.toUpperCase()} */}
                  {/* {moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')} */}
                  {/* </p> */}
                  {/* </td> */}
                  {/* ----------------------------------- */}
                  {new Set(pool.matches.map((match: any) => match?.league?.id)).size == 1 ? (
                    <td className={classes.poolsTableRowData}>
                      <p className={classes.poolName}>
                        {pool.matches?.[0]?.league?.name.toUpperCase()}
                        {moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')}
                      </p>
                    </td>
                  ) : (
                    <td className={classes.poolsTableRowData}>
                      <p className={classes.poolName}>
                        Mixed{moment(new Date(parseInt(`${pool.startTime}000`))).format('D/M')}
                      </p>
                    </td>
                  )}
                  {/* ----------------------------------- */}
                  <td>
                    <p className={classes.poolCreated}>
                      {moment(parseFloat(`${pool.startTime}000`)).format('DD-MM-YYYY HH:mm')}
                    </p>
                  </td>
                  <td>
                    <p className={classes.poolCreated}>
                      {moment(parseFloat(`${pool.endTime}000`)).format('DD-MM-YYYY HH:mm')}
                    </p>
                  </td>
                  <td>
                    <p className={classes.poolCreated}>{pool.totalParticipants}</p>
                  </td>
                  <td>
                    <p className={classes.poolName}>{Web3.instance.utils.fromWei(pool.fee)} BUND</p>
                  </td>
                  <td>
                    <button
                      className={classes.actionBtn}
                      onClick={() => navigate(`/pools/${pool.id}/reward`)}>
                      Reward
                    </button>
                    <button className={classes.actionBtn} onClick={() => navigate(`/pools/${pool.id}/grade`)}>
                      Grade
                    </button>
                    <button
                      className={classes.actionBtn}
                      onClick={() => navigate(`/pools/${pool.id}/update`)}>
                      Edit
                    </button>
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
