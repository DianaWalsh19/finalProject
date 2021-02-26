import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account.email = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={this.state.account.email}
              onChange={this.handleChange}
              id="email"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              autoFocus
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
