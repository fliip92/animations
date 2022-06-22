import React, {FC} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IPokemon} from '../../hooks/useKantoPokemon';
import {usePokemon} from '../../hooks/usePokemon';

const {width} = Dimensions.get('window');
const ITEM_SIZE = width / 2;

export const Item: FC<IPokemon> = ({name, url}) => {
  const {data, isLoading} = usePokemon({name, url});
  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      {!isLoading && (
        <Image
          source={{uri: data?.sprites.front_default}}
          style={styles.image}
        />
      )}
      <LinearGradient
        colors={['transparent', 'transparent']}
        style={[StyleSheet.absoluteFillObject, styles.gradientBackground]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.nameContainer]}>
          {name}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 94,
    fontWeight: 'bold',
    opacity: 0.1,
  },
  gradientBackground: {justifyContent: 'flex-end', padding: 10},
  nameContainer: {
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {width: '100%', height: '100%'},
});
