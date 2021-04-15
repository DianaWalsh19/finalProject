import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import Readings from "./components/readings";
import Users from "./components/users";
import Graph from "./components/graph";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ReadingForm from "./components/readingForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Experiment from "./components/experiment";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: posts } = await axios.post(apiEndpoint, obj);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/users" component={Users} />
            <Route path="/experiment" component={Experiment} />
            <Route path="/readings/:id" component={ReadingForm} />
            <Route path="/readings/new" component={ReadingForm} />
            <Route path="/readings" component={Readings} />
            <Route path="/graph" component={Graph} />
            <Redirect from="/" exact to="/users" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
