import React, { useState } from "react";
import pokemonService from "../services/pokedex.service";

export default () => {
  const [pokemon, setPokemon] = useState();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search-input");

    pokemonService
      .getPokemon(searchTerm)
      .then(({ data }) => {
        setPokemon(data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("Pokemon not found!");
          return;
        }

        alert(err.response.data);
      });
  };

  return (
    <>
      <header>
        <h1 data-testid="page-title">Pokedex!</h1>
      </header>
      <section>
        <form onSubmit={onSubmit}>
          <label htmlFor="search-input" style={{ display: "block" }}>
            Pokemón name
          </label>
          <input
            id="search-input"
            placeholder="Search for your Pokémon"
            style={{ width: 300 }}
            name="search-input"
            required
          />
        </form>
      </section>
      {pokemon && (
        <section
          data-testid="pokemon-details"
          style={{ border: "1px solid", marginTop: 5, padding: 5, width: 300 }}
        >
          <h2 data-testid="pokemon-name">{pokemon.name}</h2>
          <ul>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>
              Abilities:{" "}
              {pokemon.abilities.map(({ ability }) => ability.name).join(", ")}
            </li>
          </ul>
          <img
            alt={pokemon.name}
            src={pokemon.sprites.front_default}
            height={96}
            width={96}
          />
        </section>
      )}
    </>
  );
};
