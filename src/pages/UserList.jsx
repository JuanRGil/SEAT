import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllUsers, updateUser, deleteUser, saveUser,
} from '../services/user-api';
import Table from '../components/Table';
import columns from './utils/columns';

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const columnsMemoized = useMemo(() => columns, []);
  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data));
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    setUsers((old) => old.map((row, index) => {
      if (index === rowIndex) {
        const newData = {
          ...old[rowIndex],
          [columnId]: value,
        };
        // super happy path;
        // TODO : fix bifurcated data. two sources of thruth
        if (newData.id) {
          updateUser(newData);
        } else {
          saveUser(newData);
        }
        return newData;
      }
      return row;
    }));
  };
  const onView = (userId) => {
    navigate(`${userId}`);
  };

  const onDelete = (userId) => {
    setSkipPageReset(true);
    setUsers((old) => {
      deleteUser(userId);
      return old.filter((user) => user.id !== userId);
    });
  };

  return (
    <Table
      columns={columnsMemoized}
      data={users}
      skipPageReset={skipPageReset}
      updateMyData={updateMyData}
      onDelete={onDelete}
      onView={onView}
    />
  );
}

export default UserList;
