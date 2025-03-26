import { useState } from 'react';
import { getFullPokedexNumber, pokemons } from '../utils';
import { FaArrowLeft } from '@react-icons/all-files/fa/faArrowLeft';

export const SideNav = ({
  selectedPokemonIndex,
  setSelectedPokemonIndex,
  isNavOpen,
  handleNavClose,
}) => {
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
    <nav className={' ' + (!isNavOpen ? ' open' : '')}>
      <div className={'header ' + (!isNavOpen ? ' open' : '')}>
        <button className='open-nav-button' onClick={handleNavClose}>
          <FaArrowLeft />
        </button>
        <h1 className='text-gradient'>Pokedex</h1>
      </div>
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
            onClick={() => {
              setSelectedPokemonIndex(pokedexNumber);
              handleNavClose();
            }}
          >
            <p>{getFullPokedexNumber(pokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};
