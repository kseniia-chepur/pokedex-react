import { getFullPokedexNumber, pokemons } from '../utils';

export const SideNav = () => {
  return (
    <nav>
      <h1 className='text-gradient'>Pokedex</h1>
      <input />
      {pokemons.map((pokemon, i) => (
        <button key={pokemon} className={'nav-card'}>
          <p>{getFullPokedexNumber(i)}</p>
          <p>{pokemon}</p>
        </button>
      ))}
    </nav>
  );
};
