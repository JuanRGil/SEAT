/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function ActionsCell({
  value: initialValue,
  onView,
  onDelete,
}) {
  const [userId, setUserId] = useState(initialValue);

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setUserId(initialValue);
  }, [initialValue]);

  return (
    <>
      <button type="button" onClick={() => onView(userId)}>View</button>
      <button type="button" onClick={() => onDelete(userId)}>Delete</button>
    </>
  );
}
export default [
  {
    Header: 'Users',
    columns: [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Surname', accessor: 'surname' },
      { Header: 'Age', accessor: 'age' },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ActionsCell,
      },
    ],
    Footer: ({ addNewEmptyRow }) => (<button type="button" onClick={addNewEmptyRow}>Add New User</button>),
  }];
