import React from "react";

const ReadingsTable = (props) => {
  const { readings, onDelete, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("user.email")}>User email</th>
          <th onClick={() => onSort("value")}>Reading Value</th>
          <th onClick={() => onSort("dateTime")}>Date and Time</th>
          <th onClick={() => onSort("preMed")}>Pre/Post Medication</th>
          <th onClick={() => onSort("notes")}>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {readings.map((reading) => (
          <tr key={reading._id}>
            <td>{reading.user.email}</td>
            <td>{reading.value}</td>
            <td>{reading.dateTime}</td>
            <td>{reading.preMed}</td>
            <td>{reading.notes}</td>
            <td>
              <button
                onClick={() => onDelete(reading)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReadingsTable;
