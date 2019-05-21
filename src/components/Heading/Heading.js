import React from "react";
import "./Heading.scss";

const Heading = () => {
  return (
    <div className="heading">
      <h1 className="title">2048</h1>
      <a className="restart-btn">New Game</a>
      <div className="scores-container">
        <div className="score-container">1</div>
        <div className="best-container">1</div>
      </div>
    </div>
  );
};

export default Heading;
