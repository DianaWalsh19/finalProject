import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Readings from "./components/readings";
import Users from "./components/users";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/users" component={Users} />
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
