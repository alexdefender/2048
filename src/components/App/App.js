import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";

class App extends Component {
  state = {
    cells: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
    /*cells: [
      [1, 1, 1, 1],
      [1, null, null, null],
      [null, 1, null, 1],
      [null, null, 1, null]
    ],*/
    startGame: true
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);

    if (this.state.startGame) {
      this.startNewGame();
      this.setState({ startGame: false });
    } else {
      this.addRandomTwo();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    console.log(e);
  };

  startNewGame = () => {
    this.addRandomTwo();
    this.addRandomTwo();
  };

  addRandomTwo = () => {
    const cells = this.state.cells;
    const randRow = this.generateRandomInteger();
    const randColumn = this.generateRandomInteger();

    if (cells[randRow][randColumn] === null) {
      cells[randRow][randColumn] = 2;
      this.setState({ cells });
    } else {
      this.addRandomTwo();
    }
  };

  generateRandomInteger = () => {
    const min = 0;
    const max = 3;
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
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
