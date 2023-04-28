import axios from "axios";
import pokedexService from "./pokedex.service";

jest.mock("axios");
jest.spyOn(axios, "get");

describe("Pokedéx service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an Error", () => {
    expect(() => pokedexService.getPokemon()).toThrowError();
  });

  describe("Pokemon Search", () => {
    const cases = [
      ["pikachu", "/pokemon/pikachu"],
      ["dragonfly", "/pokemon/dragonfly"],
    ];

    it.each(cases)("search by %s", (name, expected) => {
      pokedexService.getPokemon(name);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0].includes(expected)).toBe(true);
    });
  });

  describe("Pokemon Search (invalid argument)", () => {
    const cases = [[""], [null], [1]];

    it.each(cases)("search by %s", (name) => {
      expect(() => pokedexService.getPokemon(name)).toThrow(Error);
    });
  });
});
