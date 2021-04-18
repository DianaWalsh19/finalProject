import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getReading, saveReading } from "../services/readingService";
import { getUsers } from "../services/userService";

class ReadingForm extends Form {
  state = {
    data: {
      value: "",
      userId: "",
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
    userId: Joi.string().allow("").label("User ID"),
    preMed: Joi.string().required().label("PreMedication"),
    dateTime: Joi.string().required().label("Date and Time"),
    notes: Joi.string().allow("").label("Notes"),
  };

  async populateUser() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateReading() {
    try {
      const readingId = this.props.match.params.id;
      if (readingId === "new") return;
      const { data: reading } = await getReading(readingId);
      this.setState({ data: this.mapToViewModel(reading) });
    } catch (ex) {
      if (ex.respose && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    //await this.populateUser();
    await this.populateReading();
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
  doSubmit = async () => {
    await saveReading(this.state.data);
    this.props.history.push("/readings");
  };

  render() {
    return (
      <div>
        <h1>New Reading</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("value", "Value")}
          {this.renderCheck("preMed", "Pre or Post Medication?")}
          {this.renderDateTime("dateTime", "Date")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReadingForm;
