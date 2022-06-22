import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDebounceAnimatedValue} from '../../hooks/useDebounce';
import {Arrow} from './Arrow';
import {Target} from './Target';

const array = new Array(112).fill(0);

const {width, height} = Dimensions.get('window');

const Crazy: FC = () => {
  const x = useDebounceAnimatedValue(0, 2000);
  const y = useDebounceAnimatedValue(0, 2000);

  useDerivedValue(() => {
    const moveX = Math.random() < 0.5;
    if (moveX) {
      x.value = withTiming(Math.random() * width, {duration: 400});
    } else {
      y.value = withTiming(Math.random() * height, {duration: 400});
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      {array.map((_, i) => {
        return <Arrow key={i} targetX={x} targetY={y} />;
      })}
      <Target x={x} y={y} />
    </SafeAreaView>
  );
};

export default Crazy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 20,
  },
});
