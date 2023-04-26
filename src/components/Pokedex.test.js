import React from "react";
import { render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";

test("Pokedéx", () => {
  render(<Pokedex />);

  const titleHeader = screen.queryByTestId("pokedex-title");
  expect(titleHeader).toBeInTheDocument();
  expect(titleHeader.querySelector("h1")).toBeInTheDocument();
  expect(titleHeader.querySelector("h1").innerHTML).toBeTruthy();

  const formSection = screen.queryByTestId("pokedex-form");
  expect(formSection).toBeInTheDocument();
  expect(formSection.querySelector("label")).toBeInTheDocument();
  expect(formSection.querySelector("input")).toBeInTheDocument();

  expect(screen.queryByTestId("pokedex-details")).not.toBeInTheDocument();
});
