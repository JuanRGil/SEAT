/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useTable } from 'react-table/dist/react-table.development';
import './table.scss';

// Create an editable cell renderer
function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

function Table({
  columns, data, skipPageReset, updateMyData, onDelete, onView,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
    autoResetPage: !skipPageReset,
    updateMyData,
    onDelete,
    onView,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
