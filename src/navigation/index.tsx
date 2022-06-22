/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AnimatedHeader from '../screens/AnimatedHeader';
import AnimatedFlatList from '../screens/AnimatedFlatList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootView} from '../screens/RootView';
import Crazy from '../screens/Crazy';
import {AnimatedSlide} from '../screens/AnimatedSlide';
import StickyElements from '../screens/StickyElements';
import Lottie from '../screens/Lottie';
import Polymorphism from '../screens/Polymorphism';

export enum Routes {
  Root = 'Root',
  AnimatedHeader = 'AnimatedHeader',
  AnimatedFlatList = 'AnimatedFlatList',
  Crazy = 'Crazy',
  AnimatedSlider = 'AnimatedSlider',
  StickyTop = 'StickyTop',
  StickyBottom = 'StickyBottom',
  StickyDefault = 'StickyDefault',
  Lottie = 'Lottie',
  Polymorphism = 'Polymorphism',
}

type RootStackParamList = {
  [Routes.AnimatedHeader]: undefined;
  [Routes.AnimatedFlatList]: undefined;
  [Routes.Crazy]: undefined;
  [Routes.Root]: undefined;
  [Routes.AnimatedSlider]: undefined;
  [Routes.StickyTop]: undefined;
  [Routes.StickyBottom]: undefined;
  [Routes.StickyDefault]: undefined;
  [Routes.Lottie]: undefined;
  [Routes.Polymorphism]: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const Theme = {
  ...DefaultTheme,
};

const navigationRef = createNavigationContainerRef<RootStackParamList>();

function Navigation() {
  const {Navigator, Screen, Group} = Stack;
  return (
    <NavigationContainer theme={Theme} ref={navigationRef}>
      <Navigator initialRouteName={Routes.Root}>
        <Group screenOptions={{headerShown: false}}>
          <Screen name={Routes.AnimatedHeader} component={AnimatedHeader} />
          <Screen name={Routes.AnimatedFlatList} component={AnimatedFlatList} />
          <Screen name={Routes.Crazy} component={Crazy} />
          <Screen name={Routes.Root} component={RootView} />
          <Screen name={Routes.AnimatedSlider} component={AnimatedSlide} />
          <Screen name={Routes.Polymorphism} component={Polymorphism} />
          <Screen
            name={Routes.StickyTop}
            component={() => <StickyElements type="top" />}
          />
          <Screen
            name={Routes.StickyBottom}
            component={() => <StickyElements type="bottom" />}
          />
          <Screen
            name={Routes.StickyDefault}
            component={() => <StickyElements type="default" />}
          />
          <Screen name={Routes.Lottie} component={Lottie} />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
