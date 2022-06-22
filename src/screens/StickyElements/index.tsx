import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {BoringElement, StickyElement} from '../../components';
import {StickyType} from '../../components/StickyElement';
import {data} from '../AnimatedFlatList/data';

const StickyElements: FC<{type: StickyType}> = ({type}) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(ev => {
    scrollY.value = ev.contentOffset.y;
  });
  return (
    <Animated.View style={[styles.container]}>
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {data.map(item => {
          if (item.sticky) {
            return <StickyElement item={item} scrollY={scrollY} type={type} />;
          }
          return <BoringElement item={item} />;
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});

export default StickyElements;
