import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import SearchHome from '../views/SearchScreen';
import SearchDetails from '../views/MapScreen';
import Booking from '../views/BookingScreen';

const SearchTabView = ({ navigation }) => (
  <SearchHome banner="Search" navigation={navigation} />
);

const SearchDetailTabView = ({ navigation }) => (
  <SearchDetails banner="Search Detail" navigation={navigation} />
);

const BookingTabView = ({ navigation }) => (
		  <Booking banner="Booking" navigation={navigation} />
		);

const SearchTab = StackNavigator({
  Home: {
    screen: SearchTabView,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Search',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    }),
  },
  Detail: {
    screen: SearchDetailTabView,
    path: 'search_detail',
    navigationOptions: {
      title: 'Search Detail',
    },
  },
  Booking: {
	    screen: BookingTabView,
	    path: 'booking',
	    navigationOptions: {
	      title: 'Booking Detail',
	    },
	  },
});

export default SearchTab;
