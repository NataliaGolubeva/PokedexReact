import React, { useState, useEffect } from "react";
import slugify from "react-slugify";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

function AllPokemons() {
  //const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  //   const getPokemonList = async () => {
  //     let pokemonArray = [];
  //     for (let i = 1; i <= 151; i++) {
  //       pokemonArray.push(await getPokemonData(i));
  //     }
  //     console.log(pokemonArray);
  //     setPokemon(pokemonArray);
  //     setLoading(false);
  //   };

  //   const getPokemonData = async (id) => {
  //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //     return res;
  //   };

  //   useEffect(() => {
  //     getPokemonList();
  //   }, []);
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/?limit=500&offset=0`)
      .then((response) => {
        setPokemonData(response.data.results);
        console.log(response.data.results);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
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
          {pokemonData.map(
            (p, index) =>
              pokemonData[index].name.startsWith(filter) && (
                <GridItem key={index + 1} m={10}>
                  <Link
                    className="pokeyLink"
                    to={`/pokemon/${index + 1}/${slugify(p.name, {
                      strict: true,
                      lower: true,
                    })} `}
                  >
                    <Box background={"white"} pb={10} align="center">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          index + 1
                        }.png`}
                        alt="pok"
                        height="200px"
                      ></img>
                      <h1>
                        {index + 1}.
                        {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                      </h1>
                    </Box>
                  </Link>
                </GridItem>
              )
          )}
        </Grid>
      )}
    </>
  );
}

export default AllPokemons;
