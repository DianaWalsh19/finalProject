import React, { Component, useState } from "react";
import Dropdown from "./common/dropdown";
import { getReadings } from "../services/fakeReadingService";

class Readings extends Component {
  state = {
    options: [],
    currentPage: 1,
  };
}
export default function Experiment() {
  const [value, setValue] = useState(null);
  return (
    <div style={{ width: 200 }}>
      <Dropdown
        prompt="Select reading"
        id="_id"
        label="dateTime"
        options={getReadings()}
        value={value}
        onChange={(val) => setValue(val)}
      />
    </div>
  );
}
