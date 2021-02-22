import React, { Component } from "react";
import Table from "./common/table";

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
    const { readings, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={readings}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ReadingsTable;
