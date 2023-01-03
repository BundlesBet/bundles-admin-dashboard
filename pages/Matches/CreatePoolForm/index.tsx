import axios from 'axios';
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
  poolName: string;
  fee: string;
  reward: string;
}

interface FORM_PROPS {
  sport?: string;
  league?: string;
  selectedMatches: any[];
  closeFormModal: () => void;
}

const CreatePoolForm = (props: FORM_PROPS) => {
  const isTxSuccess = useSwitch();
  // const { pools } = useAppData();
  // const { Prediction } = Contracts.instances;
  const { account, refresh } = useMetamask();
  const isTransactionInProgress = useSwitch();
  const isTxSuccessfulModalOpen = useSwitch();
  const { sport, league, selectedMatches, closeFormModal } = props;
  const [endTime, onEndTimeChange] = useState<any>(new Date());
  const [startTime, onStartTimeChange] = useState<any>(new Date());

  const [formStates, setFormStates] = useState<FORM_STATES>({
    poolName: '',
    fee: '',
    reward: '',
  });

  const onInputChange = (e: any) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!account) return;
    try {
      let base = new BN(10);
      let fee = new BN(parseFloat(formStates.fee) * Math.pow(10, 8)).mul(base.pow(new BN(10)));
      isTransactionInProgress.true();
      isTxSuccessfulModalOpen.true();
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/createPool`, {
        sport: sport,
        poolName: formStates.poolName,
        leagueName: league,
        startTime: startTime,
        endTime: endTime,
        fee: formStates.fee,
        reward: formStates.reward,
        totalMatches: selectedMatches.length,
        matches: selectedMatches,
      });
      isTransactionInProgress.false();
      isTxSuccess.true();
      setTimeout(() => {
        closeFormModal();
      }, 2000);
      console.log(response);
    } catch (error) {
      console.log(error);
      isTransactionInProgress.false();
      closeFormModal();
    }
  };

  return (
    <Fragment>
      <PoolFormMatchesTable selectedMatches={selectedMatches} />
      <form>
        <div className={classes.orderedList}>
          <ol type="1" className={classes.selectedMatches}>
            {/* {selectedMatches.map((match: any, index) => {
              <li key={index}>attempt {parseInt(match)}</li>;
            })} */}
          </ol>
        </div>

        <label>Pool Name</label>
        <input
          className={classes.textInput}
          type="text"
          placeholder="Enter Pool Name"
          name="poolName"
          onChange={onInputChange}
          autoComplete="off"
          required
        />

        <label>Start Time</label>
        <input
          type="date"
          className={classes.textInput}
          value={moment(startTime).format('YYYY-MM-DD')}
          onChange={(e) => onStartTimeChange(new Date(e.target.value))}
        />

        <label>End Time</label>
        <input
          type="date"
          className={classes.textInput}
          value={moment(endTime).format('YYYY-MM-DD')}
          onChange={(e) => onEndTimeChange(new Date(e.target.value))}
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

        <label>Reward</label>
        <input
          className={classes.textInput}
          type="text"
          placeholder="Enter Reward"
          name="reward"
          onChange={onInputChange}
          autoComplete="off"
          required
        />

        <button className={classes.submitBtn} onClick={onFormSubmit}>
          Create Pool
        </button>
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
