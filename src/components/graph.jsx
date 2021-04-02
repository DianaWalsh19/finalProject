// Need to read the time and if before 12:00 display one line. If after 12:00, display another
//Needs to filter if pre or post medication

import React, { Component, useState } from "react";
import Dropdown from "./common/dropdown";
import DatePicker from "./common/datePicker";
import { getReadings } from "../services/fakeReadingService";
import _ from "lodash";
import Pdf from "react-to-pdf";
import {
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

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleDateDropdown = (selectedOption) => {
    this.setState({ selectedOption, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      sortColumn,
      selectedOption,
      searchQuery,
      readings: allReadings,
      ref,
    } = this.state;

    let filtered = allReadings;

    return { totalCount: filtered.length, data: this.state.readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: readings } = this.getPagedData();
    const options = {
      orientation: "landscape",
    };
    const ref = React.createRef();

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
        <div className="col">
          <div className="row" ref={ref}>
            <div className="col-3"></div>
            <div className="col">
              <LineChart
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
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
