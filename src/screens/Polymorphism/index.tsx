import chroma from 'chroma-js';
import React, {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  // withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      width: withSpring(width.value),
      height: withSpring(height.value),
      borderRadius: withSpring(borderRadius.value),
      backgroundColor: withTiming(backgroundColor.value, {duration: 500}),
      borderWidth: withSpring(borderWidth.value),
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  const onPress = () => {
    width.value = Math.floor(Math.random() * 300) + 50;
    height.value = Math.floor(Math.random() * 300) + 50;
    borderRadius.value = Math.floor(Math.random() * 50);
    borderWidth.value = Math.floor(Math.random() * 2);
    backgroundColor.value = colors[Math.floor(Math.random() * colors.length)];
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = x.value;
      context.startY = y.value;
    },
    onActive(event, context) {
      x.value = context.startX + event.translationX;
      y.value = context.startY + event.translationY;
    },
    // onEnd: () => {
    //   x.value = withDecay({
    //     velocity: 200,
    //   });
    //   y.value = withDecay({
    //     velocity: 200,
    //   });
    // },
  });

  return (
    <SafeAreaView style={styles.contianer}>
      <Pressable onPress={onPress}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[animatedStyle, styles.AnimatedBox]} />
        </PanGestureHandler>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimatedBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Polymorphism;
