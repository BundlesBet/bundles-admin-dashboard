import classes from './UpcomingMatchesTableModal.module.scss';
import { useMetamask } from 'contexts/Metamask';
import { useAppData } from 'contexts/AppData';
import Contracts from 'helpers/contracts';
interface UpcomingMatchesProps {
  selectedMatches: any;
  closeUpcomingMatchesTableModal: () => void;
}

const UpcomingMatchesTableModal = (props: UpcomingMatchesProps) => {
  const { selectedMatches, closeUpcomingMatchesTableModal } = props;

  const { account, refresh } = useMetamask();

  const addMatches = async () => {
    if (!account) return;
    try {
      const { Prediction } = Contracts.instances;
      console.log(selectedMatches);
      const matches = await selectedMatches.map((value: any) => {
        return [value.league.id, value.id];
      });
      await Prediction.methods
        .addMatches(matches)
        .send({ from: account })
        .on('receipt', (receipt) => {});
      // .on('error', () => {
      //   isTransactionInProgress.false();
      //   isTxSuccess.false();
      //   setTimeout(closeFormModal, 2000);
      // });
      // setTimeout(() => {
      //   closeFormModal();
      // }, 30000);
    } catch (error) {
      console.log(error);
      // isTransactionInProgress.false();
      // closeFormModal();
    }
  };

  setTimeout(() => {
    closeUpcomingMatchesTableModal();
  }, 20000);

  return (
    <div className={classes.upcomingMatchModalContainer}>
      <h3 className={classes.upcomingMatchModalTitleText}>Upcoming Matches</h3>
      <div className={classes.upcomingMatchModalMatchCards}>
        {selectedMatches.map((match: any) => {
          //prettier-ignore
          const {teams: { a: teamA, b: teamB }} = match;
          return (
            <div className={classes.upcomingMatchModalTeamCards}>
              <div className={classes.upcomingMatchModalTeamCard}>
                <img
                  src={teamA.logo}
                  alt={teamA.abbreviation}
                  className={classes.upcomingMatchModalTeamImage}
                />
                <h4 className={classes.upcomingMatchModalTeamName}>{teamA.abbreviation}</h4>
              </div>
              <span className={classes.upcomingMatchModalVsTag}>V/s</span>
              <div className={classes.upcomingMatchModalTeamCard}>
                <img
                  src={teamB.logo}
                  alt={teamB.abbreviation}
                  className={classes.upcomingMatchModalTeamImage}
                />
                <h4 className={classes.upcomingMatchModalTeamName}>{teamB.abbreviation}</h4>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.modalSubmitButton}>
        <button className={classes.submitBtn} onClick={addMatches}>
          Add Matches
        </button>
      </div>
    </div>
  );
};

export default UpcomingMatchesTableModal;
