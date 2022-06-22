import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const OFFSET = 0;

export interface ItemProps {
  item: {
    color: string;
    height: number;
    key: string;
  };
  index: number;
  scrollY: Animated.SharedValue<number>;
  itemY: Animated.SharedValue<number>;
  itemHeight: Animated.SharedValue<number>;
}

export const Item: FC<ItemProps> = ({
  item,
  index,
  scrollY,
  itemY,
  itemHeight,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [itemY.value - 1, itemY.value, itemY.value + itemHeight.value],
        [1, 1, 0],
      ),
      transform: [
        {perspective: itemHeight.value > 0 ? itemHeight.value * 4 : 1},
        {
          translateY: interpolate(
            scrollY.value,
            [
              itemY.value - index * OFFSET - 1,
              itemY.value - index * OFFSET,
              itemY.value - index * OFFSET + 1,
            ],
            [0, 0, 1],
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [itemY.value - 1, itemY.value, itemY.value + itemHeight.value],
            [1, 1, 0],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {backgroundColor: item.color, height: item.height},
        animatedStyle,
      ]}>
      <Text style={[styles.textContainer]}>{item.color}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textContainer: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
