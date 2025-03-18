import { pokemonTypeColors } from '../utils';

export const TypeCard = ({ type }) => {
  return (
    <div
      className='type-tile'
      style={{
        color: pokemonTypeColors?.[type]?.color,
        backgroundColor: pokemonTypeColors?.[type]?.background,
      }}
    >
      <p>{type}</p>
    </div>
  );
};
