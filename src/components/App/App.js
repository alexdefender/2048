import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";
import { sumDoubleCells, rotate90 } from "../../utils/helpers";

class App extends Component {
  state = {
    /* cells: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],*/
    cells: [
      [4, null, null, null],
      [4, null, null, null],
      [4, null, null, null],
      [4, null, null, null]
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

    if (keyCode === arrowUp) {
      this.moveCellsUp();
    }

    if (keyCode === arrowRight) {
      this.moveCellsRight();
    }

    if (keyCode === arrowDown) {
      this.moveCellsDown();
    }
  };

  startNewGame = () => {
    this.addRandomTwo();
    this.addRandomTwo();
  };

  addRandomTwo = () => {
    const { cells } = this.state;
    const min = 0;
    const max = cells.length - 1;
    const randRow = this.generateRandomInteger(min, max);
    const randColumn = this.generateRandomInteger(min, max);

    if (cells[randRow][randColumn] === null) {
      cells[randRow][randColumn] = 2;
      this.setState({ cells });
    } else {
      this.addRandomTwo();
    }
  };

  moveCellsLeft = () => {
    const { cells } = this.state;
    cells.map(cell => sumDoubleCells(cell));
    this.setState({ cells });
    this.addRandomTwo();
  };

  moveCellsUp = () => {
    const { cells } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr.map(cell => sumDoubleCells(cell));
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr });
    this.addRandomTwo();
  };

  moveCellsRight = () => {
    const { cells } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr = rotate90(rotateArr);
    rotateArr.map(cell => sumDoubleCells(cell));
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr });
    this.addRandomTwo();
  };

  moveCellsDown = () => {
    const { cells } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    rotateArr.map(cell => sumDoubleCells(cell));
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr });
    this.addRandomTwo();
  };

  generateRandomInteger = (min, max) => {
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
