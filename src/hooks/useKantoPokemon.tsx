import {useQuery} from 'react-query';

export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemons {
  count: number;
  results: IPokemon[];
}

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

const getKantoPokemon = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const useKantoPokemon = () => {
  return useQuery<IPokemons, Error>('katonPokemon', getKantoPokemon);
};
