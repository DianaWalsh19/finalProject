import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getReadings } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";

class Readings extends Component {
  state = {
    readings: [],
    users: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const users = [{ email: "All Users" }, ...getUsers()];

    this.setState({ readings: getReadings(), users });
  }

  handleDelete = (reading) => {
    const readings = this.state.readings.filter((r) => r._id !== reading._id);
    this.setState({ readings });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleUserSelect = (user) => {
    this.setState({ selectedUser: user, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.readings;
    const {
      pageSize,
      currentPage,
      selectedUser,
      readings: allReadings,
    } = this.state;

    if (count === 0) return <p>There are no readings in the database.</p>;

    const filtered =
      selectedUser && selectedUser._id
        ? allReadings.filter((r) => r.user._id === selectedUser._id)
        : allReadings;

    const readings = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.users}
            //textProperty="email"
            //valueProperty="_id"
            selectedItem={this.state.selectedUser}
            onItemSelect={this.handleUserSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} readings in the database.</p>
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
              {readings.map((reading) => (
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
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Readings;
