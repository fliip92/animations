import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IPokemon, useKantoPokemon} from '../../hooks/useKantoPokemon';
import {Item} from './Item';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<IPokemon>);

const AnimatedSlide: FC<{}> = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(ev => {
    scrollX.value = ev.contentOffset.x;
  });
  const {data, isLoading} = useKantoPokemon();
  if (isLoading || !data?.results) {
    return null;
  }
  return (
    <SafeAreaView>
      <Animated.View style={[styles.container]}>
        <AnimatedFlatList
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          data={data?.results as IPokemon[]}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
            <Item
              name={item.name}
              url={item.url}
              scrollX={scrollX}
              index={index}
            />
          )}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dedede',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {AnimatedSlide};
