import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";
import axios from "axios";

jest.mock("axios");

jest.spyOn(window, "alert");

describe("Pokedéx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Pokedéx", () => {
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

  describe("Searching", () => {
    it("should search for pokemon", async () => {
      const response = Promise.resolve({
        data: {
          name,
          abilities: [
            {
              ability: { name: "bite" },
            },
            {
              ability: { name: "scream" },
            },
          ],
          sprites: { front_default: "/image.png" },
          height: 10,
          weight: 20,
        },
      });

      axios.get.mockImplementation((name) => response);

      render(<Pokedex />);

      const formSection = screen.queryByTestId("pokedex-form");
      expect(formSection).toBeInTheDocument();

      const searchEl = formSection.querySelector("input");
      expect(searchEl).toBeInTheDocument();

      fireEvent.change(searchEl, { target: { value: "pikachu" } });
      fireEvent.submit(searchEl);
      await act(() => response);

      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0].includes("/pokemon/pikachu")).toBe(
        true
      );

      const detailsSection = screen.queryByTestId("pokedex-details");
      expect(detailsSection).toBeInTheDocument();
      expect(screen.getByText("Weight: 20")).toBeInTheDocument();
      expect(screen.getByText("Height: 10")).toBeInTheDocument();
      expect(screen.getByText("Abilities: bite, scream")).toBeInTheDocument();
      expect(detailsSection.querySelector("img")).toHaveAttribute(
        "src",
        "/image.png"
      );
    });

    it("should not search", () => {
      render(<Pokedex />);

      const formSection = screen.queryByTestId("pokedex-form");
      expect(formSection).toBeInTheDocument();

      const searchEl = formSection.querySelector("input");
      expect(searchEl).toBeInTheDocument();

      const formEL = formSection.querySelector("form");
      expect(formEL).toBeInTheDocument();

      fireEvent.submit(formEL);
      expect(axios.get).not.toHaveBeenCalled();
    });
  });

  // it("should return 404", async () => {
  //   const response = Promise.reject({
  //     response: {
  //       status: 404,
  //     },
  //   });

  //   render(<Pokedex />);

  //   axios.get.mockImplementation((name) => response);

  //   const formSection = screen.getByTestId("pokedex-form");
  //   const searchEl = formSection.querySelector("input");

  //   fireEvent.change(searchEl, { target: { value: "pikachu" } });
  //   fireEvent.submit(searchEl);
  //   await act(() => response);

  //   expect(window.alert).toHaveBeenCalled();
  // });
});
