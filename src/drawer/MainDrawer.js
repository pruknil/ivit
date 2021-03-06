import Expo from 'expo';
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MainTab from '../tabs/MainTab';
import SearchTab from '../tabs/SearchTab';

const MainDrawer = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/mains',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'home' : 'home-outline'}
            size={30}
            type="material-community"
            color={tintColor}
          />
        ),
      },
    },

    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'search' : 'search'}
            size={30}
            type="font-awesome"
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'MainTab',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
  }
);

MainDrawer.navigationOptions = {
  drawerLabel: 'นิมนต์พระ',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material-community"
      color={tintColor}
    />
  ),
};

// Workaround to avoid crashing when you come back on MainDrawer screen
// and you were not on the Buttons tab
export default StackNavigator(
  {
    MainDrawerTabs: { screen: MainDrawer },
  },
  {
    headerMode: 'none',
  }
);
