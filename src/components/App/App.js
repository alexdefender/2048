import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";
import { sumDoubleCells, rotate90 } from "../../utils/helpers";
import {
  ARROW_LEFT,
  ARROW_UP,
  ARROW_RIGHT,
  ARROW_DOWN,
  START_INT
} from "../../utils/variables";

class App extends Component {
  state = {
    cells: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
    score: 0
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.setState({ startGame: true });
  }

  componentDidUpdate() {
    if (this.state.startGame) {
      this.addRandomTwo();
      this.addRandomTwo();
      this.setState({ startGame: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = ({ keyCode }) => {
    if (keyCode === ARROW_LEFT) {
      this.moveCellsLeft();
    } else if (keyCode === ARROW_UP) {
      this.moveCellsUp();
    } else if (keyCode === ARROW_RIGHT) {
      this.moveCellsRight();
    } else if (keyCode === ARROW_DOWN) {
      this.moveCellsDown();
    }
  };

  startNewGame = () => {
    const cells = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.setState({ cells, startGame: true });
  };

  addRandomTwo = () => {
    const { cells } = this.state;
    const min = 0;
    const max = cells.length - 1;
    const randRow = this.generateRandomInteger(min, max);
    const randColumn = this.generateRandomInteger(min, max);

    if (cells[randRow][randColumn] === null) {
      cells[randRow][randColumn] = START_INT;
      this.setState({ cells });
    } else {
      this.addRandomTwo();
    }
  };

  moveCellsLeft = () => {
    let { cells, score } = this.state;
    cells.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      return arrScore.arr;
    });
    this.setState({ cells, score });
    this.addRandomTwo();
  };

  moveCellsUp = () => {
    let { cells, score } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      return arrScore.arr;
    });
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr, score });
    this.addRandomTwo();
  };

  moveCellsRight = () => {
    let { cells, score } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr = rotate90(rotateArr);
    rotateArr.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      return arrScore.arr;
    });
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr, score });
    this.addRandomTwo();
  };

  moveCellsDown = () => {
    let { cells, score } = this.state;
    let rotateArr = rotate90(cells);
    rotateArr = rotate90(rotateArr);
    rotateArr = rotate90(rotateArr);
    rotateArr.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      return arrScore.arr;
    });
    rotateArr = rotate90(rotateArr);
    this.setState({ cells: rotateArr, score });
    this.addRandomTwo();
  };

  generateRandomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  render() {
    const { cells, score } = this.state;

    return (
      <div className="container">
        <Heading startNewGame={this.startNewGame} score={score} />
        <GameContainer cells={cells} />
      </div>
    );
  }
}

export default App;
