import React, { Component, useState } from "react";
import ReadingsTable from "./readingsTable";
import Pagination from "./common/pagination";
import Dropdown from "./common/dropdown";
import { getReadings, deleteReading } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";
import DatePicker from "./common/datePicker";
import moment from "moment";
import _ from "lodash";
import { DateRangePicker } from "react-dates";

class Readings extends Component {
  state = {
    readings: [],
    users: [],
    options: [],
    dateFiltered: "",
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedUser: null,
    sortColumn: { path: "user.email", order: "asc" },
  };

  componentDidMount() {
    const users = [{ _id: "", email: "All Users" }, ...getUsers()];
    let dateFiltered = "";
    this.setState({ readings: getReadings(), users, dateFiltered });
  }

  handleDelete = (reading) => {
    const readings = this.state.readings.filter((r) => r._id !== reading._id);
    this.setState({ readings });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  showAllReadings = () => {
    const readings = getReadings();
    this.setState({ readings, dateFiltered: "", currentPage: 1 });
  };

  filterPreMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "preMed");
    this.setState({ readings, currentPage: 1 });
  };

  filterPostMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "postMed");
    this.setState({ readings, currentPage: 1 });
  };

  handleToday = () => {
    moment().format();
    const today = moment(0, "HH");
    const tomorrow = moment().add(1, "days").startOf("day");
    const readings = getReadings().filter(
      (r) => moment(r.dateTime) >= today && moment(r.dateTime) < tomorrow
    );
    this.setState({ readings, currentPage: 1, dateFiltered: "today" });
  };

  handleYesterday = () => {
    moment().format();
    const today = moment(0, "HH");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const readings = getReadings().filter(
      (r) => moment(r.dateTime) >= yesterday && moment(r.dateTime) < today
    );
    this.setState({ readings, currentPage: 1, dateFiltered: "yesterday" });
  };

  handleSevenDays = () => {
    moment().format();
    const startDate = moment().add(1, "days").startOf("day");
    const endDate = moment().subtract(7, "days").startOf("day");
    const readings = getReadings().filter(
      (r) => moment(r.dateTime) >= endDate && moment(r.dateTime) <= startDate
    );
    this.setState({ readings, currentPage: 1, dateFiltered: "sevenDays" });
  };

  handleDatePicker = () => {
    moment().format();
    const startDate = DatePicker.startDate;
    const endDate = DatePicker.endDate;
    console.log(startDate, endDate);
    const readings = getReadings().filter(
      (r) => moment(r.dateTime) >= endDate && moment(r.dateTime) <= startDate
    );
    console.log(getReadings());
    console.log({ readings });
    this.setState({ readings, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      dateFiltered,
      readings: allReadings,
    } = this.state;

    let filtered = allReadings;

    /*if (selectedOption && searchQuery)
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
      );*/

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const readings = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
          <h3 style={{ paddingTop: 50 }}>Filter by date</h3>
          <div>
            <div>
              <button
                style={{ width: 200, textAlign: "left" }}
                type="button"
                className="btn btn-light"
                onClick={this.handleToday}
              >
                Today
              </button>
              <button
                style={{ width: 200, textAlign: "left" }}
                type="button"
                className="btn btn-light"
                onClick={this.handleYesterday}
              >
                Yesterday
              </button>
              <button
                style={{ width: 200, textAlign: "left" }}
                type="button"
                className="btn btn-light"
                onClick={this.handleSevenDays}
              >
                Last 7 days
              </button>
            </div>
            <DatePicker />
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
