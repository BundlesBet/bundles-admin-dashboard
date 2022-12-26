import BN from 'bn.js';
import { sportImage } from 'config';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import classes from './UpdatePool.module.scss';
import BettingModal from 'components/BettingModal';
import { useState, useEffect, useRef } from 'react';

//Contexts
import useSwitch from 'hooks/useSwitch';
import Contracts from 'helpers/contracts';
import { useAppData } from 'contexts/AppData';
import { useMetamask } from 'contexts/Metamask';

const UpdatePool = () => {
  const { id } = useParams();
  const { pools } = useAppData();
  const isTxSuccess = useSwitch();
  const { account, refresh } = useMetamask();
  const isTransactionInProgress = useSwitch();
  const isTxSuccessfulModalOpen = useSwitch();
  const { Prediction } = Contracts.instances;
  const pool = pools?.filter((pool: any) => pool?.id == parseInt(id || '0'))?.[0];
  const { matches, results } = pool;
  const [deleteSelected, setDeleteSelected] = useState<Array<number>>([]);
  const [keepSelectedMatches, setKeepSelectedMatches] = useState<Array<number>>([]);
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const updatedMatches = matches.reduce((total: any, match: any) => {
      const { id } = match;
      deleteSelected.filter((matchId: any) => {
        if (parseInt(matchId) !== parseInt(id) && !deleteSelected.includes(id) && !total.includes(id)) {
          total.push(id);
          return total;
        }
      });
      return total;
    }, []);
    setKeepSelectedMatches(updatedMatches);
  }, [deleteSelected.length]);

  const handleOnChange = (matchId: number) => {
    if (!deleteSelected.includes(matchId)) {
      setDeleteSelected((oldArray: number[]) => [...oldArray, matchId]);
    } else {
      setDeleteSelected((oldArray: number[]) => oldArray.filter((id: any) => id !== matchId));
    }
  };

  const deleteSelectedMatch = async (e: any, poolID: string) => {
    e.preventDefault();
    parseInt(poolID);
    if (!account) return;
    if (!deleteSelected.length) return toast.error('Please select one or more matches to delete.');
    if (parseInt(`${pool?.startTime}000`) > Date.now()) {
      try {
        // let base = new BN(10);
        isTransactionInProgress.true();
        isTxSuccessfulModalOpen.true();
        // let fee = new BN(parseFloat(pool?.fee) * Math.pow(10, 8)).mul(base.pow(new BN(10)));
        await Prediction.methods
          .updatePool(poolID, [
            keepSelectedMatches,
            [],
            pool?.startTime,
            pool?.endTime,
            pool?.fee?.toString(),
            0,
          ])
          .send({ from: account })
          .on('receipt', (receipt) => {
            isTransactionInProgress.false();
            receipt.status ? isTxSuccess.true() : isTxSuccess.false();
          })
          .on('error', () => {
            isTransactionInProgress.false();
            isTxSuccess.false();
          });
        setDeleteSelected([]);
        refresh.rerender();
        isTransactionInProgress.false();
        setTimeout(isTxSuccessfulModalOpen.false, 2000);
      } catch (error) {
        console.log(error);
        isTransactionInProgress.false();
        setTimeout(isTxSuccessfulModalOpen.false, 2000);
      }
    } else {
      return toast.error('The pool is already active. You cannot remove matches from on-going pools.');
    }
  };

  return (
    <>
      <div className={classes.updatePageContainer}>
        <div className={classes.updateInfo}>
          <p> Total Matches: {matches?.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Remove</th>
              <th>Sports</th>
              <th>Teams</th>
            </tr>
          </thead>
          <tbody>
            {matches?.map((match: any, index: number) => {
              const { id } = match;
              return (
                <tr key={index}>
                  <td>
                    <input
                      id="delete"
                      type="checkbox"
                      name="delete"
                      ref={checkboxRef}
                      checked={deleteSelected.includes(id)}
                      onChange={() => handleOnChange(id)}
                    />
                  </td>
                  <td>
                    <img src={sportImage(match?.league?.sport)} alt="Match" />
                  </td>
                  <td>
                    <div className={classes.matchTeams}>
                      <div
                        className={
                          results[index] !== 0 && results[index] === match?.teams?.a?.value
                            ? `${classes.homeTeamPS} ${classes.highlightWinningTeam}`
                            : classes.homeTeamP
                        }>
                        <img src={match?.teams?.a?.logo} alt="Home-Team-Flag" />
                        <p>{match?.teams?.a?.name}</p>
                      </div>
                      <span>VS</span>
                      <div
                        className={
                          results[index] !== 0 && results[index] === match?.teams?.b?.value
                            ? `${classes.homeTeamPS} ${classes.highlightWinningTeam}`
                            : classes.homeTeamP
                        }>
                        <img src={match?.teams?.b?.logo} alt="Away-Team-Flag" />{' '}
                        <p>{match?.teams?.b?.name}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={classes.addBtn} onClick={(e: any) => deleteSelectedMatch(e, pool.id)}>
          Delete Match(s)
        </button>
        <BettingModal
          show={isTxSuccessfulModalOpen.value}
          loading={isTransactionInProgress.value}
          txStatus={isTxSuccess.value}
        />
      </div>
    </>
  );
};

export default UpdatePool;
