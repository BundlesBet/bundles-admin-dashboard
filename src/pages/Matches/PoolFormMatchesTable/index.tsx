//Contexts
import { sportImage } from 'config';
import { useAppData } from 'contexts/AppData';

// Styles.
import classes from './PoolFormMatchesTable.module.scss';

const PoolFormMatchesTable = (props: any) => {
  //prettier-ignore
  // const {upcomingMatches, isLoading: { matches }} = useAppData();

  // const { selectedMatches } = props;

  return (
    <div className={classes.screenContainer}>
      <h3 className={classes.titleText}>Matches</h3>
      <div className={classes.matchCards}>
            <div className={classes.teamCards}>
              <div className={classes.teamCard}>
                <img src={sportImage("soccer")} alt={"home-team"} className={classes.teamImage} />
                <h4 className={classes.teamName}>Abbreviation</h4>
              </div>
              <span className={classes.VsTag}>V/s</span>
              <div className={classes.teamCard}>
                <img src={sportImage("soccer")} alt="away-team" className={classes.teamImage} />
                <h4 className={classes.teamName}>Abbreviation</h4>
              </div>
            </div>
      </div>
    </div>
  );
};

export default PoolFormMatchesTable;
