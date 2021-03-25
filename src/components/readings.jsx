import React, { Component, useState } from "react";
import ReadingsTable from "./readingsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import Dropdown from "./common/dropdown";
import SearchBox from "./searchBox";
import { getReadings, deleteReading } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Readings extends Component {
  state = {
    readings: [],
    users: [],
    options: [],
    selectedOption: "",
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedUser: null,
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
    this.setState({ selectedUser: user, searchQuery: "", currentPage: 1 });
  };

  showAllReadings = () => {
    const readings = getReadings();
    this.setState({ readings, currentPage: 1 });
  };

  filterPreMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "preMed");
    this.setState({ readings, currentPage: 1 });
  };

  filterPostMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "postMed");
    this.setState({ readings, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleDateDropdown = (selectedOption) => {
    this.setState({ selectedOption });
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
      selectedOption,
      searchQuery,
      readings: allReadings,
    } = this.state;

    /*let filtered = allReadings;
    if (searchQuery && selectedUser)
      filtered = allReadings.filter(
        (r) =>
          r.preMed.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
          r.user._id === selectedUser._id
      );
    else if (selectedUser && selectedUser._id)
      filtered = allReadings.filter((r) => r.user._id === selectedUser._id);
    else if (searchQuery || (searchQuery && selectedUser._id === ""))
      filtered = allReadings.filter((r) =>
        r.preMed.toLowerCase().startsWith(searchQuery.toLowerCase())
      );*/

    let filtered = allReadings;
    if (selectedOption && searchQuery)
      filtered = allReadings.filter(
        (r) =>
          r.dateTime === selectedOption.dateTime &&
          r.preMed.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedOption)
      filtered = allReadings.filter(
        (r) => r.dateTime === selectedOption.dateTime
      );
    else if (searchQuery)
      filtered = allReadings.filter((r) =>
        r.preMed.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const readings = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no readings in the database.</p>;

    const { totalCount, data: readings } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <h3>Filters</h3>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.showAllReadings}
            >
              See All Readings
            </button>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.filterPreMed}
            >
              Pre-Medication
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.filterPostMed}
            >
              Post-Medication
            </button>
          </div>
          <div style={{ width: 200 }}>
            <Dropdown
              prompt="Select Date and Time"
              id="_id"
              label="dateTime"
              options={getReadings()}
              value={this.state.selectedOption}
              onChange={(val) => this.handleDateDropdown(val)}
            />
          </div>
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
