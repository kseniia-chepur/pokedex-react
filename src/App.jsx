import { useState } from 'react';
import { Header } from './components/Header';
import { PokeCard } from './components/PokeCard';
import { SideNav } from './components/SideNav';

export const App = () => {
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);

  return (
    <>
      <Header />
      <SideNav
        selectedPokemonIndex={selectedPokemonIndex}
        setSelectedPokemonIndex={setSelectedPokemonIndex}
      />
      <PokeCard selectedPokemonIndex={selectedPokemonIndex} />
    </>
  );
};
