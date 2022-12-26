// Libraries.
import { Fragment, useState } from 'react';

// Styles.
import classes from './Pools.module.scss';

//Contexts
import { useAppData } from 'contexts/AppData';

// Reuseable Components.
// import Modal from 'components/Modal';
import ActiveTable from './ActiveTable';
import Spinner from 'components/Common/Spinner';

const Pools = () => {
  // Modal Control System.
  // const [isCreateLeagueFormOpened, setIsCreateLeagueOpened] = useState(false);
  // const [isResultOpened, setIsResultOpened] = useState(true);

  // Tabs Control System.

  // const { connect, disconnect, account } = useMetamask();

  // const { Prediction } = Contracts.instances;

  const { pools, isLoading } = useAppData();

  const activePools = pools.filter(
    (pool) =>
      parseFloat(`${pool.endTime}000`) > Date.now() && parseFloat(`${pool.startTime}000`) < Date.now(),
  );

  const upcomingPools = pools.filter((pool) => parseFloat(`${pool.startTime}000`) > Date.now());

  const endedPools = pools.filter((pool) => parseFloat(`${pool.endTime}000`) < Date.now());

  const [tabState, setTabState] = useState(1);

  const tabsSwitcher = (index: number) => {
    switch (index) {
      case 1:
        return <ActiveTable pools={activePools} tabState={tabState} />;
      case 2:
        return <ActiveTable pools={endedPools} tabState={tabState} />;
      case 3:
        return <ActiveTable pools={pools} tabState={tabState} />;
    }
  };

  return (
    <Fragment>
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn} onClick={() => console.log('View Button Clicked')}>
          Pools
        </button>
      </div>

      <div className={classes.resultContainer}>
        <div className={classes.tabsButtonsContainer}>
          <button
            className={tabState === 1 ? `${classes.tabButton} ${classes.activeTab}` : classes.tabButton}
            onClick={() => setTabState(1)}>
            Active
          </button>
          <button
            className={tabState === 2 ? `${classes.tabButton} ${classes.activeTab}` : classes.tabButton}
            onClick={() => setTabState(2)}>
            Inactive
          </button>
          <button
            className={tabState === 3 ? `${classes.tabButton} ${classes.activeTab}` : classes.tabButton}
            onClick={() => setTabState(3)}>
            ShowAll({pools.length})
          </button>
          {isLoading.pools && (
            <div className={classes.matchTableSpinner}>
              <Spinner />
            </div>
          )}
        </div>
        {tabsSwitcher(tabState)}
      </div>
    </Fragment>
  );
};

export default Pools;
