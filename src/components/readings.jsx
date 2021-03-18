import React, { Component, useState } from "react";
import ReadingsTable from "./readingsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import Dropdown from "./common/dropdown";
import { getReadings, deleteReading } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Readings extends Component {
  state = {
    readings: [],
    options: [],
    users: [],
    value: "",
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedUser,
      readings: allReadings,
    } = this.state;

    const filtered =
      selectedUser && selectedUser._id
        ? allReadings.filter((r) => r.user._id === selectedUser._id)
        : allReadings;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const readings = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: readings };
  };

  handleDropdown = (value) => {
    this.setState({ value });
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no readings in the database.</p>;

    const { totalCount, data: readings } = this.getPagedData();
    //const [value, setValue] = useState(null);

    return (
      <div className="row">
        <div style={{ width: 200 }}>
          <Dropdown
            prompt="Select reading"
            id="_id"
            label="dateTime"
            options={getReadings()}
            value={this.state.value}
            onChange={(val) => this.handleDropdown(val)}
          />
        </div>
        <div className="col-3">
          <ListGroup
            items={this.state.users}
            selectedItem={this.state.selectedUser}
            onItemSelect={this.handleUserSelect}
          />
        </div>
        <div className="col">
          <div style={{ width: 200 }}></div>
          <p>Showing {totalCount} readings in the database.</p>
          <ReadingsTable
            readings={readings}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
