import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {IData} from '../screens/AnimatedFlatList/data';

interface IElement {
  item: IData;
}

const BoringElement: FC<IElement> = ({item}) => {
  return (
    <View
      style={[
        styles.container,
        {height: item.height, backgroundColor: item.color},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export {BoringElement};
