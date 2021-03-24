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
    value: Joi.number().required().min(0).max(1000).label("Value"),
    userId: Joi.string().required().label("User ID"),
    email: Joi.string().required().label("Email"),
    preMed: Joi.string().required().label("Pre or Post Medication"),
    dateTime: Joi.string().required().label("Date and Time"),
    notes: Joi.string().allow("").label("Notes"),
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

  /*onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }*/

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
          <div className="form-check">
            <label className="form-check-label" for="flexRadioDefault1">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked
                value="preMed"
                //checked={this.state.selectedOption === "preMed"}
                //onChange={this.onValueChange}
              />
              Pre-Medication
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="flexRadioDefault2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="postMed"
                //checked={this.state.selectedOption === "postMed"}
                //onChange={this.onValueChange}
              />
              Post-Medication
            </label>
          </div>
          {this.renderInput("dateTime", "Date and Time")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReadingForm;
