import {faker} from '@faker-js/faker';
import chroma from 'chroma-js';

const colors = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(30);

faker.seed(10);
export interface IData {
  key: string;
  color: string;
  height: number;
  sticky: boolean;
}

export const data = colors.map((color, index) => {
  return {
    key: faker.datatype.uuid(),
    color,
    height: faker.datatype.number(200) + 70,
    sticky: index === 7,
  };
});
