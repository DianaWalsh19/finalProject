import React, {Component} from "react";
import Readings from "./components/readings";
import './App.css';

class App extends Component {
  render(){
    return (
      <main className="container">
        <Readings />
      </main>
    );
  }
}

export default App;
