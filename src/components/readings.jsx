import React, { Component } from "react";
import { getReadings } from "../services/fakeReadingService";

class Readings extends Component {
  state = {
    readings: getReadings(),
  };

  handleDelete = (reading) => {
    const readings = this.state.readings.filter((r) => r._id !== reading._id);
    this.setState({ readings });
  };

  render() {
    const { length: count } = this.state.readings;

    if (count === 0) return <p>There are no readings in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} readings in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>User email</th>
              <th>Reading Value</th>
              <th>Date and Time</th>
              <th>Pre/Post Medication</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.readings.map((reading) => (
              <tr key={reading._id}>
                <td>{reading.user.email}</td>
                <td>{reading.value}</td>
                <td>{reading.dateTime}</td>
                <td>{reading.preMed}</td>
                <td>{reading.notes}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(reading)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Readings;
