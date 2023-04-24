import React from "react";
import { render } from "react-dom";
import Page from "./components/Pokedex";

const App = () => (
  <Page />
);

render(<App />, document.getElementById("root"));
