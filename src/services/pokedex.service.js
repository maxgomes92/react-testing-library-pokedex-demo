import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const request = axios.create({ baseURL: BASE_URL });

export default {
  getPokemon: (name) => {
    if (!name) {
      throw new Error('Name is required!')
    }

    return request.get(`/pokemon/${name}`)
  },
};
