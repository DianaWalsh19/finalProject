import React, { Component } from "react";
import ReadingsTable from "./readingsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getReadings } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Readings extends Component {
  state = {
    readings: [],
    users: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "user.email", order: "asc" },
  };

  componentDidMount() {
    const users = [{ _id: "", email: "All Users" }, ...getUsers()];
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

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.readings;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedUser,
      readings: allReadings,
    } = this.state;

    if (count === 0) return <p>There are no readings in the database.</p>;

    const filtered =
      selectedUser && selectedUser._id
        ? allReadings.filter((r) => r.user._id === selectedUser._id)
        : allReadings;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const readings = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.users}
            selectedItem={this.state.selectedUser}
            onItemSelect={this.handleUserSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} readings in the database.</p>
          <ReadingsTable
            readings={readings}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
