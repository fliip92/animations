import React, {FC} from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {Dimensions, StyleSheet} from 'react-native';
import Heart from './heart';
import PaperPlane from './paperPlane';

const {width, height} = Dimensions.get('window');

const Lottie: FC = () => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(ev => {
    scrollY.value = ev.contentOffset.y;
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      pagingEnabled={true}
      contentContainerStyle={styles.contentContainerStyle}>
      <Animated.View style={[styles.item]}>
        <LottieView
          source={require('./animations/campervan.json')}
          autoPlay
          loop
        />
      </Animated.View>
      <Heart />
      <PaperPlane scrollY={scrollY} />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {},
  item: {
    flex: 1,
    height,
    width,
  },
});

export default Lottie;
