import React, {FC} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const ReLottie = Animated.createAnimatedComponent(LottieView);

const Heart: FC = () => {
  const liked = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      progress: withTiming(liked.value, {duration: 700}),
    };
  });

  const onPress = () => {
    liked.value = liked.value === 1 ? 0 : 1;
  };

  return (
    <Animated.View style={[styles.item]}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <ReLottie
          source={require('./animations/heart.json')}
          animatedProps={animatedProps}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Heart;

const styles = StyleSheet.create({
  item: {
    width,
    height,
    flex: 1,
    zIndex: 2,
  },
  touchable: {
    flex: 1,
  },
});
