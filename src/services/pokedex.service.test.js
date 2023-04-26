import axios from "axios";
import pokedexService from "./pokedex.service";

jest.mock("axios");
jest.spyOn(axios, "create").mockImplementation(() => ({
  get: jest.fn(),
}));

describe("Pokedéx service", () => {
  it("should throw an Error", () => {
    expect(() => pokedexService.getPokemon()).toThrowError();
  });

  // it("should search by name", () => {
  //   pokedexService.getPokemon("pikachu");

  //   expect(axios.create).toHaveBeenCalled();
  // });
});
