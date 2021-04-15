// Need to read the time and if before 12:00 display one line. If after 12:00, display another
//Needs to filter if pre or post medication

import React, { Component, useState } from "react";
import Dropdown from "./common/dropdown";
import DatePicker from "./common/datePicker";
import { getReadings } from "../services/fakeReadingService";
import _ from "lodash";
import Pdf from "react-to-pdf";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class Graph extends Component {
  state = {
    readings: [],
    users: [],
    options: [],
    selectedOption: "",
    searchQuery: "",
  };
  //Two values are needed, a function can be used to create a second value depending on if the reading
  //is pre or post med. And a second line needs to be added to the graph.

  componentDidMount() {
    this.setState({ readings: getReadings() });
  }
  showAllReadings = () => {
    const readings = getReadings();
    this.setState({ readings, selectedOption: "", currentPage: 1 });
  };

  filterPreMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "preMed");
    this.setState({ readings, currentPage: 1 });
  };

  filterPostMed = () => {
    const readings = getReadings().filter((r) => r.preMed === "postMed");
    this.setState({ readings, currentPage: 1 });
  };

  filterToday = () => {};

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleDateDropdown = (selectedOption) => {
    this.setState({ selectedOption, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      selectedOption,
      searchQuery,
      readings: allReadings,
      ref,
    } = this.state;

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

    return { totalCount: filtered.length, data: this.state.readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are no readings in the database.</p>;

    const { totalCount, data: readings } = this.getPagedData();

    const options = {
      orientation: "landscape",
    };
    const ref = React.createRef();

    return (
      <div className="row flexContainer">
        <div className="col-3 flexItem">
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
                onClick={this.filterToday}
              >
                Today
              </button>
              <button
                style={{ width: 200, textAlign: "left" }}
                type="button"
                className="btn btn-light"
                value={this.state.curTime - 1}
                onClick={(value) =>
                  this.handleDateDropdown(this.state.curTime - 1)
                }
              >
                Yesterday
              </button>
              <button
                style={{ width: 200, textAlign: "left" }}
                type="button"
                className="btn btn-light"
              >
                Last 7 days
              </button>
            </div>
            <DatePicker />
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
        <div className="col" ref={ref}>
          <p>Showing {totalCount} readings in the database.</p>
          <ResponsiveContainer width="90%" height={400}>
            <LineChart
              className="graphItem"
              width={800}
              height={500}
              data={this.state.readings}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateTime" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div>
            <Pdf
              targetRef={ref}
              filename="asthma-app-graph.pdf"
              options={options}
              x={15}
              y={15}
              scale={1}
            >
              {({ toPdf }) => (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={toPdf}
                >
                  Generate Pdf
                </button>
              )}
            </Pdf>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
