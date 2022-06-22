import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';

interface IArraw {
  targetX: Animated.SharedValue<number>;
  targetY: Animated.SharedValue<number>;
}

const Arrow: FC<IArraw> = ({targetX, targetY}) => {
  const {x: arrowX, y: arrowY, onLayout} = useLayout();
  const arrowRotation = useDerivedValue(() => {
    return (
      90 +
      (Math.atan2(arrowY.value - targetY.value, arrowX.value - targetX.value) *
        180) /
        Math.PI
    );
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${arrowRotation.value}deg`,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container]} onLayout={onLayout}>
      <Animated.View style={[animatedStyle, styles.arrow]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
  },
  arrow: {
    height: 50,
    width: 2,
    backgroundColor: 'green',
  },
});

export {Arrow};
