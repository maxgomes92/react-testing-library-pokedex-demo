import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Pokedex from "./Pokedex";

test("React Testing Library works!", () => {
  const { getByText } = render(<Pokedex name="Jill" />);
  expect(getByText(/hello jill/i)).toBeInTheDocument();
});
