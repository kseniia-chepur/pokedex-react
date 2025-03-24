import { useState } from 'react';
import { getFullPokedexNumber, pokemons } from '../utils';

export const SideNav = ({ selectedPokemonIndex, setSelectedPokemonIndex }) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredPokemons = pokemons.filter((pokemon, pokemonIndex) => {
    if (getFullPokedexNumber(pokemonIndex).includes(searchValue)) {
      return true;
    }

    if (pokemon.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    return false;
  });

  return (
    <nav>
      <h1 className='text-gradient'>Pokedex</h1>
      <input
        placeholder='E.g. 001 or Bulbasaur'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {filteredPokemons.map((pokemon, pokemonIndex) => {
        const pokedexNumber = pokemons.indexOf(pokemon) + 1;
        return (
          <button
            key={pokemon}
            className={
              'nav-card ' +
              (selectedPokemonIndex === pokemonIndex ? 'nav-card-selected' : '')
            }
            onClick={() => setSelectedPokemonIndex(pokedexNumber)}
          >
            <p>{getFullPokedexNumber(pokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};
