import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getReading, saveReading } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";

class ReadingForm extends Form {
  state = {
    data: { value: "", userId: "", preMed: "", dateTime: "", notes: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    value: Joi.number().required().label("Value"),
    preMed: Joi.string().required().label("PreMedication"),
    dateTime: Joi.string().required().label("Date and Time"),
    notes: Joi.string().required().label("Notes"),
  };

  componentDidMount() {
    const users = getUsers();
    this.setState({ users });

    const readingId = this.props.match.params.id;
    if (readingId === "new") return;

    const reading = getReading(readingId);
    if (!reading) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(reading) });
  }

  mapToViewModel(reading) {
    return {
      _id: reading._id,
      userId: reading.user._id,
      value: reading.value,
      preMed: reading.preMed,
      dateTime: reading.dateTime,
      notes: reading.notes,
    };
  }
  doSubmit = () => {
    saveReading(this.state.data);
    this.props.history.push("/readings");
  };

  render() {
    return (
      <div>
        <h1>New Reading</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("value", "Value")}
          {this.renderInput("preMed", "PreMedication")}
          {this.renderInput("dateTime", "Date and Time")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReadingForm;
