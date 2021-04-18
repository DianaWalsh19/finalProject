import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Readings from "./components/readings";
import Users from "./components/users";
import Graph from "./components/graph";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ReadingForm from "./components/readingForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Experiment from "./components/experiment";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/users" component={Users} />
            <Route path="/experiment" component={Experiment} />
            <ProtectedRoute path="/readings/:id" component={ReadingForm} />
            <ProtectedRoute path="/readings/new" component={ReadingForm} />
            <ProtectedRoute path="/readings" component={Readings} />
            <ProtectedRoute path="/graph" component={Graph} />
            <ProtectedRoute from="/" exact to="/users" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
