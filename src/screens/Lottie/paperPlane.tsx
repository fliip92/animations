import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const ReLottie = Animated.createAnimatedComponent(LottieView);

interface Props {
  scrollY: Animated.SharedValue<number>;
}

const inputRange = [height, height * 2];

const PaperPlane: FC<Props> = ({scrollY}) => {
  const progress = useDerivedValue(() => {
    return interpolate(scrollY.value, inputRange, [0, 1]);
  });
  const animatedProps = useAnimatedProps(() => {
    return {
      progress: progress.value,
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, inputRange, [-height, 0]);
    return {
      transform: [{translateY}],
    };
  });
  return (
    <Animated.View style={[animatedStyle, styles.item]}>
      <ReLottie
        source={require('./animations/paperplane.json')}
        animatedProps={animatedProps}
      />
    </Animated.View>
  );
};

export default PaperPlane;

const styles = StyleSheet.create({
  item: {
    width,
    height,
    flex: 1,
    zIndex: 1,
  },
});
