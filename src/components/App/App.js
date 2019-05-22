import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";
import { sumDoubleCells } from "../../utils/helpers";

class App extends Component {
  state = {
    /* cells: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],*/
    cells: [
      [4, 4, null, null],
      [4, null, 4, null],
      [4, 4, null, 4],
      [4, 4, 4, 4]
    ],
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

  handleKeyPress = ({ keyCode }) => {
    const arrowLeft = 37;
    const arrowUp = 38;
    const arrowRight = 39;
    const arrowDown = 40;

    if (keyCode === arrowLeft) {
      this.moveCellsLeft();
    }
  };

  startNewGame = () => {
    this.addRandomTwo();
    this.addRandomTwo();
  };

  addRandomTwo = () => {
    const { cells } = this.state;
    const randRow = this.generateRandomInteger();
    const randColumn = this.generateRandomInteger();

    if (cells[randRow][randColumn] === null) {
      cells[randRow][randColumn] = 2;
      this.setState({ cells });
    } else {
      this.addRandomTwo();
    }
  };

  moveCellsLeft = () => {
    // const arr = [null, 2, 2, 4];
    // sumDoubleCells(arr);
    // console.log(arr);
    const { cells } = this.state;
    cells.map(cell => sumDoubleCells(cell));
    this.setState({ cells });
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
