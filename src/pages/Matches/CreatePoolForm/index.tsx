// Libraries.
import { Fragment, useState, useEffect } from 'react';
import BN from 'bn.js';
import { toast } from 'react-toastify';

// Styles.
import classes from './CreatePoolForm.module.scss';

import useSwitch from 'hooks/useSwitch';
import { useMetamask } from 'contexts/Metamask';
import { useAppData } from 'contexts/AppData';

import Contracts from 'helpers/contracts';

import BettingModal from 'components/BettingModal';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

//Components
import { matches } from 'graphql/queries';
import PoolFormMatchesTable from '../PoolFormMatchesTable';

interface FORM_STATES {
  selectedMatches: any[];
  fee: string;
  existingPoolID: string;
}

interface FORM_PROPS {
  selectedMatches: any[];
  closeFormModal: () => void;
}

const CreatePoolForm = (props: FORM_PROPS) => {
  const isTxSuccess = useSwitch();
  const { pools } = useAppData();
  const { Prediction } = Contracts.instances;
  const { account, refresh } = useMetamask();
  const isTransactionInProgress = useSwitch();
  const isTxSuccessfulModalOpen = useSwitch();
  const { selectedMatches, closeFormModal } = props;

  const [endTime, onEndTimeChange] = useState(new Date());
  const [startTime, onStartTimeChange] = useState(new Date());

  const [pool, setExistingPool] = useState<any>({});
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [formStates, setFormStates] = useState<FORM_STATES>({
    selectedMatches: selectedMatches,
    fee: '',
    existingPoolID: '',
  });

  const upcomingActivePools = pools?.filter((pool: any) => parseInt(`${pool.startTime}000`) > Date.now());
  const exisitingMatchesInPool = pool?.matches?.map((pool: any) => parseInt(pool?.id));
  const newlyAddedMatches = formStates?.selectedMatches?.map((pool: any) => parseInt(pool?.id));

  const onInputChange = (e: any) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };

  const handleChange = () => {
    setIsChecked((currentValue: boolean) => {
      return !currentValue;
    });
  };

  useEffect(() => {
    const _pool = pools?.filter((value) => value.id == parseInt(formStates.existingPoolID || '0'))?.[0];
    setExistingPool(_pool);
    return () => {};
  }, [formStates.existingPoolID]);

  const matchesToBeAdded = newlyAddedMatches?.reduce((total: any, matchId: any) => {
    exisitingMatchesInPool?.some(() => {
      if (exisitingMatchesInPool?.includes(matchId)) return;
      return total.push(matchId);
    });
    return total;
  }, []);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!account) return;
    try {
      let base = new BN(10);
      let fee = new BN(parseFloat(formStates.fee) * Math.pow(10, 8)).mul(base.pow(new BN(10)));
      isTransactionInProgress.true();
      isTxSuccessfulModalOpen.true();
      await Prediction.methods
        .addPool([
          formStates.selectedMatches.map((x) => parseInt(x.id)),
          [],
          (startTime.getTime() / 1000).toFixed(),
          (endTime.getTime() / 1000).toFixed(),
          fee.toString(),
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
      refresh.rerender();
      setTimeout(() => {
        closeFormModal();
      }, 20000);
    } catch (error) {
      console.log(error);
      isTransactionInProgress.false();
      closeFormModal();
    }
  };

  const onUpdateExistingPoolSubmit = async (e: any, poolID: string) => {
    e.preventDefault();
    parseInt(poolID);
    if (!account || !formStates.existingPoolID) return;
    if (parseInt(`${pool?.startTime}000`) > Date.now()) {
      try {
        // let base = new BN(10);
        isTransactionInProgress.true();
        isTxSuccessfulModalOpen.true();
        // let fee = new BN(parseFloat(pool?.fee) * Math.pow(10, 8)).mul(base.pow(new BN(10)));
        await Prediction.methods
          .updatePool(poolID, [
            [...matchesToBeAdded, ...exisitingMatchesInPool],
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
        refresh.rerender();
        setTimeout(() => {
          closeFormModal();
        }, 20000);
      } catch (error) {
        console.log(error);
        isTransactionInProgress.false();
        closeFormModal();
      }
    } else {
      return toast.error('The pool is already active. You cannot add matches to on-going pools.');
    }
  };

  return (
    <Fragment>
      <PoolFormMatchesTable selectedMatches={selectedMatches} />
      <form>
        <div className={classes.orderedList}>
          <ol type="1" className={classes.selectedMatches}>
            {selectedMatches.map((match: any, index) => {
              <li key={index}>attempt {parseInt(match)}</li>;
            })}
          </ol>
        </div>

        <div className={classes.addToPoolDiv}>
          <label className={classes.addToPoolLabel}>Add to existing pool</label>
          <label htmlFor="addMatch" className={classes.toggle}>
            <input
              id="addMatch"
              type="checkbox"
              name="addMatch"
              checked={isChecked}
              onChange={handleChange}
              className={classes.toggleInput}
            />
            <div className={classes.toggleFill}></div>
          </label>
        </div>

        {isChecked ? (
          <div className={classes.poolIdDropdown}>
            <label htmlFor="existingPoolID">Enter Pool ID</label>
            <select
              name="existingPoolID"
              id="existingPoolID"
              className={classes.sportSelect}
              defaultValue="defaultID"
              value={formStates.existingPoolID}
              onChange={onInputChange}>
              <option value="defaultID">Select Pool ID for example #31</option>
              {upcomingActivePools.map((pool: any, index: number) => {
                return (
                  <option key={index} value={pool?.id}>
                    #{pool?.id}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <>
            <label>Start Time</label>
            <input
              type="datetime-local"
              className={classes.textInput}
              onChange={(e) => onStartTimeChange(new Date(e.target.value))}
              value={moment(startTime).format('YYYY-MM-DDTHH:mm')}
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              className={classes.textInput}
              onChange={(e) => onEndTimeChange(new Date(e.target.value))}
              value={moment(endTime).format('YYYY-MM-DDTHH:mm')}
            />

            <label>Fee</label>
            <input
              className={classes.textInput}
              type="text"
              placeholder="Fee"
              name="fee"
              onChange={onInputChange}
              autoComplete="off"
              required
            />
          </>
        )}

        {isChecked ? (
          <button
            className={classes.submitBtn}
            onClick={(e: any) => onUpdateExistingPoolSubmit(e, formStates.existingPoolID)}>
            Add to existing pool
          </button>
        ) : (
          <button className={classes.submitBtn} onClick={onFormSubmit}>
            Add Pool
          </button>
        )}
      </form>

      <BettingModal
        show={isTxSuccessfulModalOpen.value}
        loading={isTransactionInProgress.value}
        txStatus={isTxSuccess.value}
      />
    </Fragment>
  );
};

export default CreatePoolForm;
