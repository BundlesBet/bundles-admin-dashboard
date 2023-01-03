// Libraries.
import { Fragment, useState } from 'react';

// Styles.
import classes from './PoolsAllotment.module.scss';

// Assets.
import ThreeBallsImg from '../../assets/three_balls.png';

// Reuseable Components.
// import Modal from 'components/Modal';
import ActiveTable from './ActiveTable';
import InactiveTable from './InactiveTable';
import ShowAllTable from './ShowAllTable';

const allotments = [
  {
    id: 1,
    img: ThreeBallsImg,
    matches: 12,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 120,
  },
  {
    id: 2,
    img: ThreeBallsImg,
    matches: 2,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 54,
  },
  {
    id: 3,
    img: ThreeBallsImg,
    matches: 32,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 45,
  },
  {
    id: 4,
    img: ThreeBallsImg,
    matches: 41,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 85,
  },
  {
    id: 5,
    img: ThreeBallsImg,
    matches: 9,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 78,
  },
  {
    id: 6,
    img: ThreeBallsImg,
    matches: 11,
    endTime: '09:09:00 AM',
    startTime: '09:09:00 AM',
    description: 'IST (24 Hours)',
    fees: 12.0,
  },
];

const PoolsAllotment = () => {
  // Modal Control System.
  // const [isCreateLeagueFormOpened, setIsCreateLeagueOpened] = useState(false);
  // const [isResultOpened, setIsResultOpened] = useState(true);

  // Tabs Control System.
  const [tabState, setTabState] = useState(1);
  const tabsSwitcher = (index: number) => {
    switch (index) {
      case 1:
        return <ActiveTable allotments={allotments} />;
      case 2:
        return <InactiveTable />;
      case 3:
        return <ShowAllTable />;
    }
  };

  return (
    <Fragment>
      {/* Upper Section. */}
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn} onClick={() => console.log('View Button Clicked')}>
          View All Pools
        </button>
        <div className={classes.divider}>
          <hr />
        </div>
        <button className={classes.addBtn} onClick={() => console.log(true)}>
          Add New Pool
        </button>
      </div>

      {/* Bottom Section (Table). */}
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
            ShowAll(90)
          </button>
        </div>
        {tabsSwitcher(tabState)}
      </div>
    </Fragment>
  );
};

export default PoolsAllotment;
