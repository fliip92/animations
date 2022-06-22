import React from 'react';

import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';
import {data, IData} from './data';
import {Item, ItemProps} from './Item';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<IData>);

const CustomCellRendererComponent = React.memo(({children, ...props}) => {
  const {y, height, onLayout} = useLayout();
  return (
    <View {...props} onLayout={onLayout}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {itemY: y, itemHeight: height});
        }
        return child;
      })}
    </View>
  );
});

export default function _AnimatedFlatList() {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(ev => {
    scrollY.value = ev.contentOffset.y;
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AnimatedFlatList
        data={data}
        keyExtractor={item => item.key}
        onScroll={onScroll}
        scrollEventThrottle={16}
        CellRendererComponent={CustomCellRendererComponent}
        renderItem={({item, index}) => {
          return (
            <Item
              item={item}
              index={index}
              scrollY={scrollY}
              itemY={
                {
                  value: undefined,
                } as unknown as ItemProps['itemY']
              }
              itemHeight={
                {
                  value: undefined,
                } as unknown as ItemProps['itemHeight']
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    padding: 10,
  },
});
