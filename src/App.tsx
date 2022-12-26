import React, { Fragment, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles.
import './App.module.scss';

// contexts
import { useMetamask } from 'contexts/Metamask';

// Reuseable Components.
import Spinner from './components/Common/Spinner';
import Navbar from 'components/Navbar';

// Pages.
import Pools from 'pages/Pools';
import ConnectWallet from 'pages/ConnectWallet';
import Dashboard from './pages/Dashboard';
import Rewards from 'pages/PoolsAllotment'; // Change This or Rename it in The Future.
// import Admin from 'pages/Admin';
// import League from 'pages/League';
// import Teams from 'pages/Teams';
// import Matches from 'pages/Matches';
// import GradePool from 'pages/GradePool';
// import AddRewards from 'pages/AddRewards';
// import UpdatePool from 'pages/UpdatePool/UpdatePool';
const Admin = React.lazy(() => import('./pages/Admin'));
const League = React.lazy(() => import('./pages/League'));
const Matches = React.lazy(() => import('./pages/Matches'));
const GradePool = React.lazy(() => import('./pages/GradePool'));
const AddRewards = React.lazy(() => import('./pages/AddRewards'));
const UpdatePool = React.lazy(() => import('./pages/UpdatePool/UpdatePool'));

function App() {
  const { account } = useMetamask();

  if (account) {
    return (
      <Fragment>
        <Navbar />
        <Suspense fallback={<Spinner className={'centerSpinner'} />}>
          <Routes>
            <Route path="/" element={<Pools />} />
            {/* <Route path="/rewards" element={<Rewards />} /> */}
            {/* <Route path="/teams" element={<Teams />} /> */}
            <Route path="/pools" element={<Pools />} />
            <Route path="/pools/:id/grade" element={<GradePool />} />
            <Route path="/pools/:id/reward" element={<AddRewards />} />
            <Route path="/pools/:id/update" element={<UpdatePool />} />
            <Route path="/league" element={<League />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/gradepool" element={<GradePool />} />
            <Route path="/addrewards" element={<AddRewards />} />
          </Routes>
        </Suspense>
      </Fragment>
    );
  }

  return <ConnectWallet />;
}

export default App;
