import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLayout} from '../../hooks/useLayout';

const {width} = Dimensions.get('window');

const SPACING = 10;
const HEADER_SPACING = 100;
const HEADER_FONT_SIZE = 74;

interface IHeader {
  scrollY: Animated.SharedValue<number>;
  count: number;
}

export const Header: FC<IHeader> = ({scrollY, count}) => {
  const {top} = useSafeAreaInsets();
  // const headerHeight = useSharedValue(100);
  const {height: headerHeight, onLayout} = useLayout();

  const textStylez = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        scrollY.value,
        // stick the headerSpacing
        [0, HEADER_SPACING, headerHeight.value],
        [HEADER_FONT_SIZE, 24, 24],
        Extrapolate.CLAMP,
      ),
    };
  });
  const headerContainerStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        scrollY.value,
        [0, 100],
        [50, 0],
        Extrapolate.CLAMP,
      ),
      marginBottom: interpolate(
        scrollY.value,
        [
          -1,
          0,
          HEADER_SPACING + HEADER_FONT_SIZE,
          headerHeight.value + HEADER_FONT_SIZE,
        ],
        [HEADER_SPACING + 1, HEADER_SPACING, 0, 0],
      ),
    };
  });

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: top,
        },
      ]}
      onLayout={onLayout}>
      <Animated.View>
        <Animated.Text
          style={[
            styles.titleContainer,
            {
              paddingRight: width / 4 - SPACING * 2,
            },
            textStylez,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit>
          Kanto Pokemon
        </Animated.Text>
        <Text style={{color: 'white'}}>{count} pokemons</Text>
      </Animated.View>
      <Animated.View style={[headerContainerStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    padding: SPACING,
    backgroundColor: '#0B1C33',
  },
  titleContainer: {
    color: 'white',
    fontSize: 54,
    fontWeight: '700',
    letterSpacing: -1,
  },
});
