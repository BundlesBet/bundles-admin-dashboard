import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './GradePool.module.scss';

//Contexts
import { sportImage } from 'config';
import useSwitch from 'hooks/useSwitch';
import Contracts from 'helpers/contracts';
import { useAppData } from 'contexts/AppData';
import { useMetamask } from 'contexts/Metamask';
import Spinner from 'components/Common/Spinner';
import fetchSinglePool from 'helpers/fetchSinglePool';
import useForceUpdate from '../../hooks/useForceUpdate';
import usePersistentToast from '../../hooks/usePersistentToast';

const GradePool = () => {
  // const { id } = useParams();
  // const { pools } = useAppData();
  // const forceUpdate = useForceUpdate();
  // const { account, refresh } = useMetamask();
  // const isTransactionInProgress = useSwitch();
  // const isTxSuccessfulModalOpen = useSwitch();
  // const [totalGraded, setTotalGraded] = useState<number>(0);
  // const [fetchedPool, setFetchedPool] = useState<any>(null);
  // const [isScreenLoading, setIsScreenLoading] = useState<boolean>(true);
  // const pool = pools?.filter((value) => value.id == parseInt(id || '0'))?.[0];
  // const [selectedTeams, setSelectedTeams] = useState(
  //   Array.from(Array(pool.matches.length).keys()).map(() => 0),
  // );
  // const postGradedMessage = usePersistentToast('All the matches have been graded.', 'info');

  // const { matches, results } = pool;

  // useEffect(() => {
  //   const _totalGraded = results?.reduce((total: number, result: number) => {
  //     if (result > 0 && result !== 3 && result !== 4) {
  //       total++;
  //     }
  //     return total;
  //   }, 0);
  //   setTotalGraded(_totalGraded);
  //   return () => {};
  // }, [results]);

  // const fetchPool = async () => {
  //   try {
  //     const _fetchedPool = await fetchSinglePool(pool);
  //     setFetchedPool(_fetchedPool);
  //     setIsScreenLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsScreenLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPool();
  // }, []);

  // const displayToastMessage = () => {
  //   if (totalGraded === matches.length) {
  //     postGradedMessage.trigger();
  //     return forceUpdate.rerender();
  //   }
  // };

  // useEffect(() => {
  //   displayToastMessage();
  // }, [totalGraded]);

  // const gradePool = async (e: any) => {
  //   if (!account) return;
  //   try {
  //     const { Prediction } = Contracts.instances;
  //     isTransactionInProgress.true();
  //     isTxSuccessfulModalOpen.true();
  //     await Prediction.methods
  //       .gradePools(id as string, selectedTeams)
  //       .send({ from: account })
  //       .on('receipt', (receipt: any) => {
  //         refresh.rerender();
  //       });
  //     refresh.rerender();
  //     isTransactionInProgress.false();
  //     setTimeout(isTxSuccessfulModalOpen.false, 2000);
  //   } catch (error) {
  //     console.log(error);
  //     isTransactionInProgress.false();
  //   }
  // };

  // if (isScreenLoading) {
  //   return (
  //     <div>
  //       <Spinner className={'centerSpinner'} />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={classes.resultContainer}>
        {/* {totalGraded === matches.length ? displayToastMessage() : null} */}
        <div className={classes.gradeInfo}>
          <p>Total Matches Graded: 0</p>
          <p> Total Matches: 0</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sports</th>
              <th>Pick Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={sportImage('soccer')} alt="Match" />
              </td>
              <td>
                <div className={classes.matchTeams}>
                  <div className={classes.commonClassPS}>
                    <img src={sportImage('soccer')} alt="Home-Team-Flag" />
                    <p>Home Team</p>
                  </div>
                  <span>VS</span>
                  <div className={classes.commonClassP}>
                    <img src={sportImage('soccer')} alt="Home-Team-Flag" /> <p>Away Team</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <button className={classes.addBtn} onClick={gradePool}> */}
        <button className={classes.addBtn}>Grade Pool</button>
      </div>
    </>
  );
};

export default GradePool;
