import React, {FC} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IRipple {
  width: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
  centerX: Animated.SharedValue<number>;
  centerY: Animated.SharedValue<number>;
  rippleOpacity: Animated.SharedValue<number>;
  backgroundColor: Animated.SharedValue<string>;
  scale: Animated.SharedValue<number>;
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const Ripple: FC<IRipple> = ({
  x,
  y,
  width,
  height,
  centerX,
  centerY,
  rippleOpacity,
  backgroundColor,
  scale,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: backgroundColor.value,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        {translateX},
        {translateY},
        {
          scale: scale.value,
        },
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
      <Animated.View style={rStyle} />
    </PanGestureHandler>
  );
};

export {Ripple};
