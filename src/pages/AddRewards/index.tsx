import BN from 'bn.js';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './AddRewards.module.scss';

import useSwitch from 'hooks/useSwitch';
import Contracts from 'helpers/contracts';
import { useAppData } from 'contexts/AppData';
import { useMetamask } from 'contexts/Metamask';
import { fetchUserData } from 'helpers/fetchData';
import useEffectAsync from 'hooks/useEffectAsync';
import useForceUpdate from '../../hooks/useForceUpdate';
import usePersistentToast from '../../hooks/usePersistentToast';

const AddRewards = () => {
  const { id } = useParams();
  const { pools, user, isLoading } = useAppData();
  const pool = pools.filter((value) => value.id == parseInt(id || '0'))?.[0];

  const { Token, Prediction } = Contracts.instances;

  const [totalBund, setTotalBund] = useState(0);

  // useEffectAsync(async () => {
  //   let totalBund = Number(
  //     (await Prediction.methods.pools(parseInt(id || '0')).call()).totalRewards,
  //   ).valueOf();
  //   setTotalBund(totalBund);
  // }, [id]);

  // useEffectAsync(async () => {
  //   let totalBund = Number(
  //     (await Prediction.methods.pools(parseInt(id || '0')).call()).totalRewards,
  //   ).valueOf();

  //   setTotalBund(totalBund);
  // }, [id]);

  const forceUpdate = useForceUpdate();
  const { account, refresh } = useMetamask();
  const isTransactionInProgress = useSwitch();
  const isTxSuccessfulModalOpen = useSwitch();
  let { predictions } = pool;
  const { fee, results, matches, matchIds, participants, rewardRecipients } = pool;
  const totalMatches = matches?.length;
  const [userIndex, setUserIndex] = useState(participants.length - 1);
  const [preRewardsState, setPreRewardsState] = useState<boolean>(true);
  const [postRewardsState, setPostRewardsState] = useState<boolean>(false);

  const postRewardsMessage = usePersistentToast('Rewards have been disbursed.', 'info');
  const preRewardsMessage = usePersistentToast('Rewards has not been disbursed yet.', 'error');

  const totalGraded = results?.reduce((total: number, result: number) => {
    if (result > 0 && result !== 3 && result !== 4) {
      total++;
    }
    return total;
  }, 0);

  predictions = predictions?.map((prediction: any, i: number) => {
    let totalScore: number = 0;
    let resultDict: any = {};
    matchIds?.map((id: any, index: number) => {
      console.log((resultDict[id] = results[index]));
      resultDict[id] = results[index];
    });
    let choiceDict: any = {};
    const { choices, predictor, matchIds: _matchIds } = prediction;
    _matchIds.map((id: any, index: number) => {
      choiceDict[id] = choices[index];
    });
    _matchIds.forEach((matchId: number, index: number) => {
      if (resultDict[matchId] > 0 && resultDict[matchId] === choiceDict[matchId]) {
        ++totalScore;
      }
    });
    prediction.totalScore = totalScore;
    if (i <= predictions.length) {
      prediction.predictionAccuracy = parseFloat(((totalScore / totalGraded) * 100).toFixed(2));
    }
    return prediction;
  });

  const calcTopPlayers = predictions
    ?.filter((prediction: any) => prediction?.totalScore !== 0)
    ?.sort((a: any, b: any) => b?.totalScore - a?.totalScore);

  const topPlayers = Math.ceil(calcTopPlayers?.length * 0.2);

  const onSetThreshold = async () => {
    if (!account) return;
    try {
      isTransactionInProgress.true();
      isTxSuccessfulModalOpen.true();

      const totalBundBN = new BN(totalBund.toString());
      const count = new BN(userIndex + 1);
      const rewardAmount = totalBundBN.div(count).toString();

      await Prediction?.methods
        ?.rewardPools(
          id as string,
          predictions.slice(0, userIndex).map((prediction: any) => {
            return prediction?.predictor;
          }),
          Array.from(Array(userIndex + 1).keys()).map(() => rewardAmount),
        )
        .send({ from: account });
      refresh.rerender();
      isTransactionInProgress.false();
      setTimeout(isTxSuccessfulModalOpen.false, 2000);
    } catch (error) {
      console.log(error);
      isTransactionInProgress.false();
    }
  };

  const displayToastMessage = () => {
    if (!rewardRecipients?.length) {
      return preRewardsMessage.trigger();
    }
    if (rewardRecipients?.length) {
      setPostRewardsState(() => {
        return true;
      });
      postRewardsMessage.trigger();
      setPreRewardsState(() => {
        return false;
      });
      forceUpdate.rerender();
    }
  };

  useEffect(() => {
    displayToastMessage();
  }, []);

  // predictions = predictions
  //   .sort((p1: any, p2: any) => {
  //     return p1.correct < p2.correct ? -1 : 1;
  //   })
  //   .reverse();

  return (
    <>
      <div className={classes.resultContainer}>
        <div className={classes.bundinfo}>
          <p>Total BUND: {totalBund / 10 ** 18}</p>
          <p>Total Matches Graded: {totalGraded}</p>
          <p>BUND per user: {totalBund / (userIndex + 1) / 10 ** 18 || 0}</p>
          <p> Pool fee: {fee / 10 ** 18}</p>
          <p> Total Matches: {totalMatches}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Address</th>
              <th>Prediction Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {predictions
              ?.sort((a: any, b: any) => b?.predictionAccuracy - a?.predictionAccuracy)
              ?.map((prediction: any, i: number) => {
                // let totalMatches = matches.length;
                const { predictor, totalScore } = prediction;
                // let totalScore: number = 0;
                // choices.forEach((choice: number, choiceIndex: number) => {
                //   if (results[choiceIndex] > 0 && results[choiceIndex] === choice) {
                //     totalScore++;
                //   }
                // });
                // if (
                //   i + 1 <= top20Players ||
                //   prediction?.predictionAccuracy === allTopPlayers?.[top20Players - 1]?.predictionAccuracy
                // ) {
                //   prediction.isHighlighted = true;
                // }
                if (
                  (preRewardsState &&
                    rewardRecipients.length === 0 &&
                    (i + 1 <= topPlayers ||
                      prediction?.predictionAccuracy ===
                        calcTopPlayers[topPlayers - 1]?.predictionAccuracy)) ||
                  (postRewardsState &&
                    rewardRecipients.length > 0 &&
                    rewardRecipients.find(
                      (recipient: any) => recipient.toLowerCase() === predictor.toLowerCase(),
                    ))
                ) {
                  prediction.isHighlighted = true;
                }
                return (
                  <tr
                    className={`${
                      (prediction.isHighlighted && prediction?.predictionAccuracy && preRewardsState) ||
                      (prediction.isHighlighted && prediction?.predictionAccuracy && postRewardsState)
                        ? `${classes.leaderboardTableBodyRow} ${classes.highlightLeader}`
                        : classes.leaderboardTableBodyRow
                    }`}>
                    <td className={classes.leaderboardTableRowData}>
                      <input type="radio" name="user" onClick={() => setUserIndex(i)} />
                    </td>
                    <td className={classes.leaderboardTableRowData}>{predictor}</td>
                    {results.length > 0 ? (
                      <td className={classes.leaderboardTableRowData}>
                        {((totalScore / totalGraded) * 100).toFixed(2)}%
                      </td>
                    ) : (
                      <td className={classes.leaderboardTableRowData}>Pending Result</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button onClick={onSetThreshold}>Set Threshold</button>
      </div>
    </>
  );
};

export default AddRewards;
