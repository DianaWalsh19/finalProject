import React, { Component, useState } from "react";
import { getReadings } from "../services/fakeReadingService";
import _ from "lodash";
import moment from "moment";
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
  //Two values are needed, a function could be used to create a second value depending on
  //if the reading is pre or post med.

  componentDidMount() {
    const readings = getReadings();
    /*
    const preMedReadings = readings.filter((r) => r.preMed === "preMed");
    function setSplitValues(readings) {
      if (readings.preMed === "preMed") {
        const preMedValue = readings.values;
        const postMedValue = 0;
      }
    }
    const postMedReadings = readings.filter((r) => r.preMed === "postMed");*/
    this.setState({ readings });
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

  getPagedData = () => {
    const { readings: allReadings } = this.state;
    let filtered = allReadings;
    return { totalCount: filtered.length, data: this.state.readings };
  };

  render() {
    const { length: count } = this.state.readings;
    const { pageSize, currentPage, searchQuery } = this.state;

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
