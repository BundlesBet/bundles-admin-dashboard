// Libraries.
import { Fragment, useState } from 'react';
import BN from 'bn.js';

// Styles.
import classes from './CreateMatchForm.module.scss';

import { useAppData } from 'contexts/AppData';
import useSwitch from 'hooks/useSwitch';
import { useMetamask } from 'contexts/Metamask';

import Contracts from 'helpers/contracts';

import BettingModal from 'components/BettingModal';

interface FORM_STATES {
  selectedLeague: string;
  espnMatchId: string;
  season: string;
}

interface FORM_PROPS {
  closeFormModal: () => void;
  // setNewMatch: any;
}

const CreateMatchForm = (props: FORM_PROPS) => {
  // const { leagues, isLoading } = useAppData();

  // const isTransactionInProgress = useSwitch();
  // const isTxSuccessfulModalOpen = useSwitch();

  // const { closeFormModal, setNewMatch } = props;

  // const { account, refresh } = useMetamask();

  // const [formStates, setFormStates] = useState<FORM_STATES>({
  //   selectedLeague: '',
  //   espnMatchId: '',
  //   season: '',
  // });

  // const onInputChange = (e: any) => {
  //   setFormStates({ ...formStates, [e.target.name]: e.target.value });
  // };

  // const isTxSuccess = useSwitch();

  // const onFormSubmit = async (e: any) => {
  //   e.preventDefault();
  //   console.log(formStates);
  //   if (!account) return;
  //   try {
  //     const { Prediction } = Contracts.instances;
  //     isTransactionInProgress.true();
  //     isTxSuccessfulModalOpen.true();
  //     await Prediction.methods
  //       .addMatch([parseInt(formStates.selectedLeague, 10), parseInt(formStates.espnMatchId, 10)])
  //       .send({ from: account })
  //       .on('receipt', (receipt) => {
  //         isTransactionInProgress.false();
  //         receipt.status ? isTxSuccess.true() : isTxSuccess.false();
  //         setTimeout(
  //           setNewMatch({
  //             league: leagues[Number(formStates.selectedLeague)].name,
  //             espnMatchId: formStates.espnMatchId,
  //           }),
  //           3000,
  //         );
  //         setTimeout(closeFormModal, 4000);
  //       })
  //       .on('error', () => {
  //         isTransactionInProgress.false();
  //         isTxSuccess.false();
  //         setTimeout(closeFormModal, 2000);
  //       });
  //     setTimeout(() => {
  //       closeFormModal();
  //     }, 30000);
  //   } catch (error) {
  //     console.log(error);
  //     isTransactionInProgress.false();
  //     closeFormModal();
  //   }
  // };

  return (
    <Fragment>
      <form>
        <div className={classes.selectWrapper}>
          <select
            name="selectedLeague"
            id="leagueSelect"
            className={classes.leagueSelect}
            defaultValue="select_league"
            // onChange={onInputChange}
          >
            <option value="select_league" disabled>
              Select League
            </option>
            <option value="league">NBA</option>
            <option value="league">NFL</option>
            <option value="league">F1</option>
            <option value="league">NASCAR</option>
            <option value="league">MMA</option>
          </select>
        </div>

        {/* <div className={classes.selectWrapper}>
          <select
            name="selectedMatch"
            id="matchSelect"
            className={classes.leagueSelect}
            defaultValue="select_match"
            onChange={onInputChange}>
            <option value="select_match" disabled>
              Select Match
            </option>
            {leagues.map((league, index) => (
              <option value={league.id}>{league.name}</option>
            ))}
          </select>
        </div> */}

        <input
          className={classes.textInput}
          type="text"
          placeholder="Espn Match Id"
          name="espnMatchId"
          // onChange={onInputChange}
          autoComplete="off"
          required
        />

        <button className={classes.submitBtn}>Add Match</button>
      </form>
      <BettingModal show={false} loading={false} txStatus={false} />
    </Fragment>
  );
};

export default CreateMatchForm;
