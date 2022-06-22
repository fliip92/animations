import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withDecay,
} from 'react-native-reanimated';
import {withBouncing} from 'react-native-redash';
import {Type, usePokemon} from '../../hooks/usePokemon';
import {IPokemon} from '../../hooks/useKantoPokemon';

const {width} = Dimensions.get('window');

const COLORS = {
  grass: 'green',
  poison: 'purple',
  fire: 'red',
  flying: 'lightblue',
  water: 'blue',
  bug: 'lightgreen',
  normal: 'pink',
  electric: 'yellow',
};

const MARGIN = 50;
const ITEM_SIZE = width - MARGIN * 2;

interface IProps extends IPokemon {
  scrollX: Animated.SharedValue<number>;
  index: number;
}

export const Item: FC<IProps> = ({name, url, index, scrollX}) => {
  const {data, isLoading} = usePokemon({name, url});
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [-200, 0, -200],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.1, 1, 0.1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY,
        },
        {
          translateY: withBouncing(withDecay({velocity: 10}), -50, 10),
        },
        {
          scale,
        },
      ],
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-500, 0, 10],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateX}],
    };
  });
  return (
    <>
      <Animated.View style={[styles.container]}>
        <Animated.Text style={[styles.text]}>{name}</Animated.Text>
        {!isLoading && (
          <Animated.Image
            source={{uri: data?.sprites.front_default}}
            style={[styles.image, imageAnimatedStyle]}
            resizeMethod="scale"
          />
        )}
      </Animated.View>
      <Animated.View style={[animatedStyle, styles.typesContainer]}>
        {data &&
          data.types.map(slot => (
            <TypePin
              key={slot.type.name}
              scrollX={scrollX}
              index={index}
              {...slot.type}
            />
          ))}
      </Animated.View>
    </>
  );
};

type IType = Pick<IProps, 'scrollX' | 'index'> & Type;

const TypePin: FC<IType> = ({name, index, scrollX}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    return {
      backgroundColor: interpolateColor(scrollX.value, inputRange, [
        'grey',
        COLORS[name as keyof typeof COLORS],
        'grey',
      ]),
    };
  });
  return (
    <Animated.View key={name} style={[styles.typesLayout, animatedStyle]}>
      <Animated.Text style={[styles.typesText]}>{name}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    margin: MARGIN,
    borderRadius: MARGIN / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    top: 4,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: 'absolute',
  },
  typesContainer: {
    width: '100%',
    height: ITEM_SIZE / 4,
    position: 'absolute',
    bottom: -ITEM_SIZE * 0.2,
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  typesLayout: {
    margin: 10,
    padding: 10,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
  typesText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
