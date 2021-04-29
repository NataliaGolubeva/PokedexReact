import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, Box } from "@chakra-ui/react";
function Pokemon() {
  const { id, name } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setImage(response.data.sprites);
        console.log(response.data.sprites);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return (
    <Box
      className="pokey"
      background="white"
      width="500px"
      m="auto"
      mt={50}
      p={20}
      align="center"
    >
      <Link href="/" className="home" color="white" textDecoration="none">
        <Box background="green" width="100px" padding="10px">
          Home
        </Box>
      </Link>

      <h2>{`Meet ${name.charAt(0).toUpperCase() + name.slice(1)}`}</h2>
      <img src={image.front_default} alt="pok" height="300px" />
      <p>Experience: {pokemon.base_experience}</p>
      <p>Weight: {pokemon.weight}</p>
    </Box>
  );
}

export default Pokemon;
