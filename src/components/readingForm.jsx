import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getReading, saveReading } from "../services/fakeReadingService";
import { getUsers } from "../services/fakeUserService";

class ReadingForm extends Form {
  state = {
    data: {
      value: "",
      userId: "",
      email: "",
      preMed: "",
      dateTime: "",
      notes: "",
    },
    users: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    value: Joi.number().label("Value"),
    userId: Joi.string().required().label("User ID"),
    email: Joi.string().required().label("Email"),
    preMed: Joi.string().required().label("PreMedication"),
    dateTime: Joi.string().required().label("Date and Time"),
    notes: Joi.string().label("Notes"),
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
      email: reading.user.email,
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
          {this.renderSelect("userId", "User ID", this.state.users)}
          {this.renderSelect("email", "Email", this.state.users)}
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
