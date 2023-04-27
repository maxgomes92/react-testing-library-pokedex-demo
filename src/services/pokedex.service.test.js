import axios from "axios";
import pokedexService from "./pokedex.service";

jest.mock("axios");
jest.spyOn(axios, "get");

describe("Pokedéx service", () => {
  it("should throw an Error", () => {
    expect(() => pokedexService.getPokemon()).toThrowError();
  });

  it("should search by name", () => {
    pokedexService.getPokemon("pikachu");

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get.mock.calls[0][0].includes("/pokemon/pikachu")).toBe(true);
  });
});
