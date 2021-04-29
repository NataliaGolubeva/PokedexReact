import React, { useState, useEffect } from "react";
import slugify from "react-slugify";
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
function AllPokemons() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const getPokemonList = async () => {
    let pokemonArray = [];
    for (let i = 1; i <= 151; i++) {
      pokemonArray.push(await getPokemonData(i));
    }
    console.log(pokemonArray);
    setPokemon(pokemonArray);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemonList();
  }, []);
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Box
        position="static"
        background={"#046604"}
        height={"100px"}
        align="center"
      >
        <FormControl id="search">
          <FormLabel py={10} className="inputLabel" textAlign="center">
            Find your pokemon
          </FormLabel>
          <Input
            type="text"
            p={10}
            width="200px"
            onChange={handleSearchChange}
          />
        </FormControl>
      </Box>

      {loading ? (
        <Spinner width="50px" height="50px" m={20} />
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
          {pokemon.map((p) => (
            // pokemon.data.name.includes(filter)
            <GridItem key={p.data.id} m={10}>
              <Link
                className="pokeyLink"
                href={`/pokemon/${p.data.id}/${slugify(p.data.name, {
                  strict: true,
                  lower: true,
                })} `}
              >
                <Box background={"white"} pb={10} align="center">
                  <img
                    src={p.data.sprites.front_default}
                    alt="pok"
                    height="200px"
                  ></img>
                  <h1>
                    {p.data.id}.
                    {p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1)}
                  </h1>
                </Box>
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
}

export default AllPokemons;