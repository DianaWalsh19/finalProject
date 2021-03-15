// Need to read the time and if before 12:00 display one line. If after 12:00, display another
//Needs to filter if pre or post medication

import React from "react";
import ListGroup from "./common/listGroup";
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

const ref = React.createRef();
const options = {
  orientation: "landscape",
};

const data = [
  {
    dateTime: "2020-01-23T19:04:28.8092",
    value: 8000,
  },
  {
    dateTime: "2020-01-24T09:04:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-24T19:04:28.8092",
    value: 2000,
  },
  {
    dateTime: "2020-01-24T19:14:28.8092",
    value: 2780,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 3000,
  },
  {
    dateTime: "2020-01-25T19:14:28.8092",
    value: 8000,
  },
];

export default function Graph() {
  return (
    <div className="row" ref={ref}>
      <div className="col-3"></div>
      <div className="col">
        <LineChart
          width={1000}
          height={600}
          data={data}
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
            <button className="btn btn-primary" type="button" onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
      </div>
    </div>
  );
}
