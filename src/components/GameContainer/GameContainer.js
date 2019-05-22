import React, { Component } from "react";
import "./GameContainer.scss";

class GameContainer extends Component {
  render() {
    const { cells } = this.props;
    return (
      <div className="game-container">
        {cells.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, k) => (
              <div key={k} className="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default GameContainer;
