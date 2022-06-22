import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Routes} from '../../navigation';

const RootView: FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
        <Item title="Animated Flat List" route={Routes.AnimatedFlatList} />
        <Item title="Animated Header" route={Routes.AnimatedHeader} />
        <Item title="Animated Slide" route={Routes.AnimatedSlider} />
        <Item title="Sticky" route={Routes.StickyDefault} />
        <Item title="Sticky Bottom" route={Routes.StickyBottom} />
        <Item title="Sticky Top" route={Routes.StickyTop} />
        <Item title="Polymorphism" route={Routes.Polymorphism} />
        <Item title="Crazy" route={Routes.Crazy} />
        <Item title="Lottie" route={Routes.Lottie} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface IItem {
  title: string;
  route: keyof typeof Routes;
}

const Item: FC<IItem> = ({title, route}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(route as any);
  };
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container]}>
        <Text>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};
export {RootView};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3c3c3',
    padding: 10,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
