import chroma from 'chroma-js';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ripple} from './Ripple';

const colors = chroma.scale('Spectral').mode('lch').colors(30);

const Polymorphism: FC = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const width = useSharedValue(100);
  const height = useSharedValue(100);
  const borderRadius = useSharedValue(0);
  const backgroundColor = useSharedValue('#c3c3c3');
  const borderWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {duration: 500}),
      height: withTiming(height.value, {duration: 500}),
      borderRadius: withTiming(borderRadius.value, {duration: 500}),
      backgroundColor: withTiming(backgroundColor.value, {duration: 500}),
      borderWidth: withTiming(borderWidth.value, {duration: 500}),
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: tapEvent => {
        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, {duration: 1000});
      },
      onActive: () => {
        width.value = Math.floor(Math.random() * 300) + 50;
        height.value = Math.floor(Math.random() * 300) + 50;
        borderRadius.value = Math.floor(Math.random() * 50);
        borderWidth.value = Math.floor(Math.random() * 2);
        backgroundColor.value =
          colors[Math.floor(Math.random() * colors.length)];
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0);
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[animatedStyle, styles.AnimatedBox]}>
          <Ripple
            {...{
              rippleOpacity,
              scale,
              x,
              y,
              centerX,
              centerY,
              width,
              height,
              backgroundColor,
            }}
          />
        </Animated.View>
      </TapGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimatedBox: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Polymorphism;
