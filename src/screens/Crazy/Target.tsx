import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

interface ITarget {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const Target: FC<ITarget> = ({x, y}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {translateY: y.value},
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = x.value;
      context.startY = y.value;
    },
    onActive(event, context) {
      x.value = context.startX + event.translationX;
      y.value = context.startY + event.translationY;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.target, animatedStyle]} />
    </PanGestureHandler>
  );
};

export {Target};

const styles = StyleSheet.create({
  target: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'red',
  },
});
