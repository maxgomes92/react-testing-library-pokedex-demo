import React from "react";
import { render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";

test("Pokedéx", () => {
  render(<Pokedex />);

  const titleEl = screen.queryByTestId("page-title");

  expect(titleEl).toBeInTheDocument();
  expect(titleEl.innerHTML).toBeTruthy();
  expect(screen.queryByTestId("pokemon-details")).not.toBeInTheDocument();
});
