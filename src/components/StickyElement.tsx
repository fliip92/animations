import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useLayout} from '../hooks/useLayout';
import {IData} from '../screens/AnimatedFlatList/data';

export type StickyType = 'top' | 'bottom' | 'default';

interface ISticky {
  item: IData;
  scrollY: Animated.SharedValue<number>;
  type: StickyType;
}

const {height: screenHeight} = Dimensions.get('window');

const StickyElement: FC<ISticky> = ({scrollY, item, type}) => {
  const {onLayout, y, height} = useLayout();

  const offset = useDerivedValue(() => {
    return -y.value + screenHeight - height.value + scrollY.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (type === 'bottom') {
      return {
        transform: [
          {
            translateY: interpolate(
              offset.value,
              [-2, -1, 0, 1],
              [offset.value, offset.value, 0, 0],
            ),
          },
        ],
      };
    } else if (type === 'top') {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [-1, 0, 1, y.value - 1, y.value, y.value + 1],
              [-y.value - 1, -y.value, -y.value + 1, -1, 0, 0],
            ),
          },
        ],
      };
    }
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [y.value - 1, y.value, y.value + 1],
            [0, 0, 1],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, animatedStyle, {height: item.height}]}>
      <Text style={styles.text}>Hi! I'm a sticky element.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    margin: 10,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export {StickyElement};
