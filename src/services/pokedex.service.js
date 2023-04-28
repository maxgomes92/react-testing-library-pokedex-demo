import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export default {
  getPokemon: (name) => {
    if (!name || typeof name !== "string") {
      throw new Error("Name is required!");
    }

    return axios.get(`${BASE_URL}/pokemon/${name}`);
  },
};
