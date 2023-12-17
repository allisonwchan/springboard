import React from "react";
import Pokedex from "./Pokedex";

function App() {
  return (
    <div className="App">
      <Pokedex pokemon={Pokedex.defaultProps} />
    </div>
  );
}

export default App;
