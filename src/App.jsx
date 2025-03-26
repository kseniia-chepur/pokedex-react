import { useState } from 'react';
import { Header } from './components/Header';
import { PokeCard } from './components/PokeCard';
import { SideNav } from './components/SideNav';

export const App = () => {
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  }

  const handleNavClose = () => {
    setIsNavOpen(true);
  }

  return (
    <>
      <Header handleNavOpen={handleNavOpen} />
      <SideNav
        selectedPokemonIndex={selectedPokemonIndex}
        setSelectedPokemonIndex={setSelectedPokemonIndex}
        isNavOpen={isNavOpen}
        handleNavClose={handleNavClose}      
      />
      <PokeCard selectedPokemonIndex={selectedPokemonIndex} />
    </>
  );
};
