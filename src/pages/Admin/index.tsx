import { useState } from 'react';
// Styles.
import classes from './Admin.module.scss';
import { useAppData } from 'contexts/AppData';
import Contracts from 'helpers/contracts';
import { useMetamask } from 'contexts/Metamask';

const Admin = () => {
  const { admins } = useAppData();

  const [adminInput, setAdminInput] = useState('');

  const { account, refresh } = useMetamask();

  const removeAdmin = async (index: any) => {
    try {
      console.log(admins[index].address);
      const { Prediction } = Contracts.instances;
      if (!account) return;
      await Prediction.methods.setAdmin(admins[index].address, false).send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = async () => {
    try {
      const { Prediction } = Contracts.instances;
      if (!account) return;
      await Prediction.methods.setAdmin(adminInput, true).send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.adminPageContainer}>
      <div className={classes.adminFormDiv}>
        <h2>Add Admin</h2>
        <div className={classes.adminForm}>
          <form onSubmit={() => {}}>
            <input
              required
              type="text"
              id="addAdmin"
              name="addAdmin"
              className={classes.textInput}
              placeholder="Account Address"
              onChange={(e) => setAdminInput(e.target.value)}
            />
          </form>
          <button className={classes.addAdminBtn} onClick={addAdmin}>
            Add Admin
          </button>
        </div>
      </div>

      <div className={classes.allAdmins}>
        <table>
          <thead>
            <tr>
              <th>Account Address</th>
            </tr>
          </thead>
          <tbody>
            {admins
              .filter((value) => value.enabled)
              .map((admin: any, index) => (
                <tr>
                  <td>
                    <p className={classes.adminAddress}>{admin.admin}</p>
                  </td>
                  <button className={classes.removeBtn} onClick={(e) => removeAdmin(index)}>
                    Remove Admin
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
