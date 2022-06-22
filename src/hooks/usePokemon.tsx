import {useQuery} from 'react-query';

export interface Type {
  name: string;
  url: string;
}

interface Slot {
  slot: number;
  type: Type;
}

export interface IPokemon {
  sprites: {
    front_default: string;
  };
  types: Slot[];
}

const getPokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

interface Props {
  name: string;
  url: string;
}

export const usePokemon = ({name, url}: Props) => {
  return useQuery<IPokemon, Error>(name, () => getPokemon(url));
};
