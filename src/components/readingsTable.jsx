import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class ReadingsTable extends Component {
  columns = [
    { path: "user.email", label: "User Email" },
    { path: "value", label: "Reading Value" },
    { path: "dateTime", label: "Date and Time" },
    { path: "preMed", label: "Pre/Post Medication" },
    { path: "notes", label: "Notes" },
    {
      key: "delete",
      content: (reading) => (
        <button
          onClick={() => this.props.onDelete(reading)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { readings, onDelete, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={readings} />
      </table>
    );
  }
}

export default ReadingsTable;
