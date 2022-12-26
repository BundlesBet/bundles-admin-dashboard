// Libraries.
import { Fragment } from 'react';

// Styles.
import classes from './ActiveTable.module.scss';

interface ModalProps {
  allotments: {
    id: number;
    img?: string;
    matches: number;
    endTime: string;
    startTime: string;
    description: string;
    fees: number;
  }[];
}

const ActiveTable = (props: ModalProps) => {
  const { allotments } = props;

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Sport</th>
            <th>Pool Matches</th>
            <th>Pool End Time</th>
            <th>Pool Start Time</th>
            <th>Pools Fees</th>
          </tr>
        </thead>
        <tbody>
          {allotments.map((allotment, index) => (
            <tr key={index}>
              <td>
                <img src={allotment.img} alt="Match" />
              </td>
              <td>
                <p className={classes.count}>{allotment.matches}</p>
              </td>
              <td>
                <p className={`${classes.timeStamp} ${classes.successColor}`}>{allotment.endTime}</p>
                <span className={`${classes.subHeaders} ${classes.muted}`}>{allotment.description}</span>
              </td>
              <td>
                <p className={`${classes.timeStamp} ${classes.dangerColor}`}>{allotment.startTime}</p>
                <span className={`${classes.subHeaders} ${classes.muted}`}>{allotment.description}</span>
              </td>
              <td>
                <p className={classes.count}>{allotment.fees}</p>
                <span className={classes.subHeaders}>Small Pool</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ActiveTable;
