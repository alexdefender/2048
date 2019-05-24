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
    /*cells: [[2, 4, 8, 16], [32, 64, 2, 4], [2, 4, 8, 2], [8, 16, null, null]],*/
    score: 0,
    startGame: true,
    gameOver: false
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
    this.setState({ cells, startGame: true, gameOver: false, score: 0 });
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
    let { cells } = this.state;
    cells = this.getArrayfromSumDoubleCells(cells); // Как правильно, передать значение по ссылке или скопировать в новый массив?
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsUp = () => {
    let { cells } = this.state;
    cells = rotate90(cells);
    cells = this.getArrayfromSumDoubleCells(cells);
    for (let i = 0; i < 3; i++) {
      cells = rotate90(cells);
    }
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsRight = () => {
    let { cells } = this.state;
    cells = rotate90(cells);
    cells = rotate90(cells);
    cells = this.getArrayfromSumDoubleCells(cells);
    cells = rotate90(cells);
    cells = rotate90(cells);
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsDown = () => {
    let { cells } = this.state;
    for (let i = 0; i < 3; i++) {
      cells = rotate90(cells);
    }
    cells = this.getArrayfromSumDoubleCells(cells);
    cells = rotate90(cells);
    this.addCellsOrStartNewGame(cells);
  };

  addCellsOrStartNewGame = arr => {
    if (!this.state.gameOver) {
      this.setState({ cells: arr });
      this.addRandomTwo();
    } else {
      alert("Game Over");
      this.startNewGame();
    }
  };

  generateRandomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  getArrayfromSumDoubleCells = arr => {
    let { score } = this.state;
    const tempScore = score;
    let isNull = false;

    arr.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      this.setState({ score });
      if (cell.includes(null)) {
        isNull = true;
      }
      return arrScore.arr;
    });

    if (isNull || tempScore !== score) {
      return arr;
    } else {
      this.setState({ gameOver: true });
      return arr;
    }
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
