// Libraries.
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

// Styles.
import classes from './CreateLeagueForm.module.scss';

import useSwitch from 'hooks/useSwitch';
import { useMetamask } from 'contexts/Metamask';

import Contracts from 'helpers/contracts';
import { leagueNames } from 'config';

import BettingModal from 'components/BettingModal';
import { useAppData } from 'contexts/AppData';

interface FORM_STATES {
  selectedSport?: string;
  selectedLeague?: string;
  season?: string;
}

interface FORM_PROPS {
  closeFormModal: () => void;
}

const CreateLeagueForm = (props: FORM_PROPS) => {
  const { leagues } = useAppData();

  const { closeFormModal } = props;

  const [formStates, setFormStates] = useState<FORM_STATES>({
    selectedSport: '',
    selectedLeague: '',
    season: '',
  });

  const onInputChange = (e: any) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };

  const isTransactionInProgress = useSwitch();
  const isTxSuccessfulModalOpen = useSwitch();
  const isTxSuccess = useSwitch();

  const { account, refresh } = useMetamask();

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!account) return;
    try {
      const { Prediction } = Contracts.instances;
      console.log(formStates);
      if (formStates.selectedSport == '' || formStates.selectedLeague == '') {
        toast.error('Invalid Input parameters');
        return;
      }
      if (
        leagues.find(
          (value) =>
            value.sport.toUpperCase() == formStates.selectedSport?.toUpperCase() &&
            value.name.toUpperCase() == formStates.selectedLeague?.toUpperCase(),
        )
      ) {
        toast.error('League already added');
        return;
      } else {
        isTransactionInProgress.true();
        isTxSuccessfulModalOpen.true();
        await Prediction.methods
          .addLeague([formStates.selectedLeague as string, formStates.selectedSport as string])
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
      }
    } catch (error) {
      console.log(error);
      isTransactionInProgress.false();
      closeFormModal();
    }
  };

  return (
    <Fragment>
      <form onSubmit={onFormSubmit}>
        <div className={classes.selectWrapper}>
          <select
            name="selectedSport"
            id="sportSelect"
            className={classes.sportSelect}
            defaultValue="select_sport"
            onChange={onInputChange}>
            <option value="select_sport" disabled>
              Select Sport
            </option>
            <option value="baseball">Baseball</option>
            <option value="basketball">BasketBall</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            <option value="rugby">Rugby</option>
            <option value="chess">Chess</option>
            <option value="hockey">Hockey</option>
            <option value="soccer">Soccer</option>
          </select>
        </div>

        {/* <input
          className={classes.textInput}
          type="text"
          placeholder="Enter League Name"
          name="selectedLeague"
          onChange={onInputChange}
          autoComplete="off"
          required
        /> */}

        <div className={classes.selectWrapper}>
          <select
            name="selectedLeague"
            id="sportSelect"
            className={classes.sportSelect}
            defaultValue="select_league"
            onChange={onInputChange}>
            <option value="select_league" disabled>
              Select League
            </option>
            {leagueNames.map((league) => (
              <option value={league.slug}>{league.name}</option>  
            ))}
          </select>
        </div>

        <button className={classes.submitBtn} onClick={onFormSubmit}>
          Create League
        </button>
        <BettingModal
          show={isTxSuccessfulModalOpen.value}
          loading={isTransactionInProgress.value}
          txStatus={isTxSuccess.value}
        />
      </form>
    </Fragment>
  );
};

export default CreateLeagueForm;
