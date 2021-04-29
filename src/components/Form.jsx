import React, { useState, useEffect } from "react";
import axios from "axios";
function Form() {
  const [searchInput, setSearchInput] = useState("pikachu");
  const [toSearch, setToSearch] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
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
    axios(`https://pokeapi.co/api/v2/pokemon/?limit=50`)
      .then((response) => {
        setPokemonData(response.data.results);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });

    return;
  }, []);
  return (
    <div>
      {pokemonData.map((pokey) => (
        <h3 key={pokey.id}>{pokey.name}</h3>
      ))}
    </div>
  );
}

export default Form;
