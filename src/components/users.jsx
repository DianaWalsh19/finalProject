import React, { Component } from "react";
import ReadingsTable from "./readingsTable";
import { Link } from "react-router-dom";
import { getReadings } from "../services/fakeReadingService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class Users extends Component {
  state = {
    readings: [],
    users: [],
    options: [],
    selectedOption: "",
    searchQuery: "",
    sortColumn: { path: "user.email", order: "asc" },
  };

  componentDidMount() {
    this.setState({ readings: getReadings() });
  }
  showAllReadings = () => {
    const readings = getReadings();
    this.setState({ readings, selectedOption: "", currentPage: 1 });
  };

  getPagedData = () => {
    const { readings: allReadings, ref } = this.state;

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
        <h3>My Readings</h3>
        <div className="flexContainer">
          <ReadingsTable
            readings={readings}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <div>
            <Link to="/readings">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
              >
                See All Readings
              </button>
            </Link>
          </div>
        </div>
        <div className="flexContainer">
          <div>
            <div className="col">
              <LineChart
                width={500}
                height={400}
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

            <Link to="/graph">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
              >
                See Graph
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Users;
