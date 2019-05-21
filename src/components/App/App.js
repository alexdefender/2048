import React from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";

const App = () => {
  return (
    <div className="container">
      <Heading />
      <GameContainer />
    </div>
  );
};

export default App;
