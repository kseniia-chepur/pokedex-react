import { useState, useEffect } from 'react';
import { getPokedexNumber, getFullPokedexNumber } from '../utils';
import { TypeCard } from './TypeCard';

export const PokeCard = ({ selectedPokemonIndex }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { name, height, abilities, moves, sprites, stats, types } = data || {};

  useEffect(() => {
    if (isLoading) {
      return;
    }

    let cache = {};
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }

    if (selectedPokemonIndex in cache) {
      setData(cache[selectedPokemonIndex]);
      return;
    }

    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${getPokedexNumber(
          selectedPokemonIndex
        )}`;
        const res = await fetch(apiUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log(pokemonData);
        cache[selectedPokemonIndex] = pokemonData;
        localStorage.setItem('pokedex', JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedPokemonIndex]);

  return (
    <div className='poke-card'>
      <h4>#{getFullPokedexNumber(selectedPokemonIndex)}</h4>
      <h2>{name}</h2>
      <div className='type-container'>
        {types &&
          types.map((typeObj) => (
            <TypeCard key={typeObj?.type?.name} type={typeObj?.type?.name} />
          ))}
      </div>
      <img
        className='default-img'
        src={`/src/assets/pokemons/${getFullPokedexNumber(
          selectedPokemonIndex
        )}.png`}
        alt={name}
      />
    </div>
  );
};
