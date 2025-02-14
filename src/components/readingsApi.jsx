import React, { Component, useState } from "react";
import ReadingsTable from "./readingsTable";
import Pagination from "./common/pagination";
import { getReadings, deleteReading } from "../services/readingService";
import { getUsers } from "../services/fakeUserService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
//import DatePicker from "./common/datePicker";
//import { DateRangePicker } from "react-dates";

class ReadingsApi extends Component {
  state = {
    readings: [],
    options: [],
    dateFiltered: "",
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedUser: null,
    sortColumn: { path: "user.email", order: "asc" },
  };

  async componentDidMount() {
    /*const { data } = await getUsers();
    const users = [{ _id: "", email: "" }, ...data];*/

    const { data } = await getReadings();
    const readings = [{ _id: "", value: "", dateTime: "" }, ...data];
    this.setState({ readings: getReadings(), readings });
  }

  handleDelete = async (reading) => {
    const originalReadings = this.state.readings;
    const readings = originalReadings.filter((r) => r._id !== reading._id);
    this.setState({ readings });

    try {
      await deleteReading(reading._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This reading has already been deleted.");
      this.setState({ readings: originalReadings });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  showAllReadings = () => {
    const readings = getReadings();
    this.setState({ readings, dateFiltered: "", currentPage: 1 });
  };

  filterPreMed = () => {
    try {
      const readings = getReadings().filter((r) => r.preMed === "preMed");
      this.setState({ readings, currentPage: 1 });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No readings to filter.");
      }
    }
  };

  filterPostMed = () => {
    try {
      const readings = getReadings().filter((r) => r.preMed === "postMed");
      this.setState({ readings, currentPage: 1 });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const errors = { ...this.state.errors };
        toast.error("No readings to filter.");
        this.setState({ errors });
      }
    }
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

  /*
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
  */

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      readings: allReadings,
    } = this.state;

    let filtered = allReadings;

    //Attempt to combine both date and medication filters.
    /*if (selectedDate && medSelect)
      filtered = allReadings.filter(
        (r) =>
          r.dateTime === selectedDate.dateTime &&
          r.preMed.toLowerCase().startsWith(medSelect.toLowerCase())
      );
    else if (selectedDate)
      filtered = allReadings.filter(
        (r) => r.dateTime === selectedDate.dateTime
      );
    else if (medSelect)
      filtered = allReadings.filter((r) =>
        r.preMed.toLowerCase().startsWith(medSelect.toLowerCase())
      );*/

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const readings = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;

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

export default ReadingsApi;
