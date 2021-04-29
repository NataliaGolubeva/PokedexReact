import React, { useEffect, useState } from "react";
import axios from "axios";
function AddPokemon() {
  const [searchInput, setSearchInput] = useState("pikachu");
  const [toSearch, setToSearch] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonType, setPokemonType] = useState("");

  const [loading, setLoading] = useState(false);

  function handleSearchInput(e) {
    setSearchInput(e.target.value.toLowerCase());
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setToSearch(searchInput);
  }
  useEffect(() => {
    if (toSearch) {
      axios(`https://pokeapi.co/api/v2/pokemon/25`)
        .then((response) => {
          setPokemonData(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return;
  }, [toSearch]);
  return (
    <div className="myPokemons">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="enter pokemon name"
        ></input>
        <button type="submit">Search</button>
      </form>
      {pokemonData.id && (
        <img src={pokemonData.sprites.back_default} alt="pok"></img>
      )}
    </div>
  );
}

export default AddPokemon;
