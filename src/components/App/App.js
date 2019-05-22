import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";

class App extends Component {
  state = {
    cells: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    console.log(e);
  };

  render() {
    const { cells } = this.state;

    return (
      <div className="container">
        <Heading />
        <GameContainer cells={cells} />
      </div>
    );
  }
}

export default App;
