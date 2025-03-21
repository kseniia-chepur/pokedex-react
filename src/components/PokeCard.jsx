import { useState, useEffect } from 'react';
import { getPokedexNumber, getFullPokedexNumber } from '../utils';
import { TypeCard } from './TypeCard';
import { Modal } from './Modal';

export const PokeCard = ({ selectedPokemonIndex }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { name, height, abilities, moves, sprites, stats, types } = data || {};

  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }

    if (['versions', 'other'].includes(val)) {
      return false;
    }

    return true;
  });

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
      <Modal handleModalClose={() => {}}>
        <div>
          <h6>Name</h6>
          <h2></h2>
          <div>
            <h6>Description</h6>
            <p></p>
          </div>
        </div>

      </Modal>
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
        alt={`${name}-img`}
      />
      <div className='img-container'>
        {imgList.map((spriteUrl) => (
          <img
            key={spriteUrl}
            src={sprites[spriteUrl]}
            alt={`${name}-img-${spriteUrl}`}
          />
        ))}
      </div>
      <h3>Stats</h3>
      <div className='stats-card'>
        {stats &&
          stats.map((statObj) => {
            const { base_stat, stat } = statObj;
            return (
              <div key={stat.name} className='stat-item'>
                <p>{stat?.name.replaceAll('-', ' ')}</p>
                <h4>{base_stat}</h4>
              </div>
            );
          })}
      </div>
      <h3>Moves</h3>
      <div className='pokemon-move-grid'>
        {moves &&
          moves.map((moveObj) => (
            <button
              className='button-card pokemon-move'
              key={moveObj?.move?.name}
            >
              <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
            </button>
          ))}
      </div>
    </div>
  );
};
