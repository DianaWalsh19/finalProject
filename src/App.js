import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Readings from "./components/readings";
import Users from "./components/users";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ReadingForm from "./components/readingForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/readings/:id" component={ReadingForm} />
            <Route path="/users" component={Users} />
            <Route path="/readings/new" component={ReadingForm} />
            <Route path="/readings" component={Readings} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/users" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
