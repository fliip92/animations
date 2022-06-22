import * as React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useKantoPokemon} from '../../hooks/useKantoPokemon';
// import {data} from './data';
import {Header} from './Header';
import {Item} from './Item';

const _columns = 2;

export default function AnimatedHeader() {
  const {data} = useKantoPokemon();
  const scrollY = useSharedValue(0);
  const headerHeight = useSharedValue(100);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const dummyHeaderStylez = useAnimatedStyle(() => {
    return {
      height: headerHeight.value * 3,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header scrollY={scrollY} count={data?.results.length ?? 0} />
      {data && (
        <Animated.FlatList
          data={data.results}
          numColumns={_columns}
          keyExtractor={item => item.url}
          scrollEventThrottle={16}
          onScroll={onScroll}
          ListHeaderComponent={<Animated.View style={dummyHeaderStylez} />}
          // stickyHeaderIndices={[0]}
          renderItem={({item}) => {
            return <Item {...item} />;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0B1C33',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
