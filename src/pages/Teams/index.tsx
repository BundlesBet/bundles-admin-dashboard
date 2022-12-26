// Libraries.
import { Fragment, useState } from 'react';

// Styles.
import classes from './Teams.module.scss';

// Assets.
import BaseballImg from '../../assets/baseball.png';
import CricketImg from '../../assets/cricket.png';
import FootballImg from '../../assets/football.png';
import RugbyImg from '../../assets/rugby.png';
import ChessImg from '../../assets/chess.png';
import HockeyImg from '../../assets/hockey.png';
import EditIcon from '../../assets/edit.png';
import DeleteIcon from '../../assets/trashcan.png';
import Logo1 from '../../assets/logo1.png';
import Logo2 from '../../assets/logo2.png';
import Logo3 from '../../assets/logo3.png';
import Logo4 from '../../assets/logo4.png';
import Logo5 from '../../assets/logo5.png';
import Logo6 from '../../assets/logo6.png';

// Reuseable Components.
// import Modal from 'components/Modal';

const teams = [
  {
    id: 1,
    img: BaseballImg,
    leagueName: 'NFL (National Football League)',
    description: 'Some description if you need',
    name: 'Sunrisers Hyderabad',
    flag: Logo1,
    status: 'active',
  },
  {
    id: 2,
    img: CricketImg,
    leagueName: 'IPL (Indian Premier League)',
    description: 'Some description if you need',
    name: 'Mumbai Indiana',
    flag: Logo2,
    status: 'active',
  },
  {
    id: 3,
    img: FootballImg,
    leagueName: 'NFL (National Football League)',
    description: 'Some description if you need',
    name: 'Chennai Super Kings !!',
    flag: Logo3,
    status: 'pending',
  },
  {
    id: 4,
    img: RugbyImg,
    leagueName: 'RBHUY (Bull Horse Clubino )',
    description: 'Some description if you need',
    name: 'Gadar Ek Prem Katha',
    flag: Logo4,
    status: 'active',
  },
  {
    id: 5,
    img: ChessImg,
    leagueName: 'Grand Slam (National -Europia)',
    description: 'Some description if you need',
    name: 'Marvel Universe DC Comics',
    flag: Logo5,
    status: 'declined',
  },
  {
    id: 6,
    img: HockeyImg,
    leagueName: 'HFRTY (Hockey Federation League)',
    description: 'Some description if you need',
    name: 'Gujraat Tuskers in India',
    flag: Logo6,
    status: 'active',
  },
];

const Teams = () => {
  return (
    <Fragment>
      {/* Upper Section. */}
      <div className={classes.requestContainer}>
        <button className={classes.viewBtn} onClick={() => console.log('View Button Clicked')}>
          View All Teams
        </button>
        <div className={classes.divider}>
          <hr />
        </div>
        <button className={classes.addBtn} onClick={() => console.log(true)}>
          Add New Team
        </button>
      </div>

      {/* Bottom Section (Table). */}
      <div className={classes.resultContainer}>
        <table>
          <thead>
            <tr>
              <th>Sport</th>
              <th>Team Logo</th>
              <th>Team Name</th>
              <th>League</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>
                  <img src={team.img} alt="League" />
                </td>
                <td>
                  <img src={team.flag} alt="Team-Logo" />
                </td>
                <td>
                  <p className={classes.sportsName}>{team.name}</p>
                </td>
                <td>
                  <p className={classes.leagueName}>{team.leagueName}</p>
                  <span className={`${classes.subHeaders} ${classes.muted}`}>{team.description}</span>
                </td>
                <td>
                  <p
                    className={
                      team.status === 'active'
                        ? classes.activeStatus
                        : team.status === 'pending'
                        ? classes.pendingStatus
                        : classes.declinedStatus
                    }>
                    {team.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Teams;
