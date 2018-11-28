import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ButtonsHome from '../views/Main';
import ButtonsDetails from '../views/buttons_detail';

const ButtonsTabView = ({ navigation }) => (
  <ButtonsHome navigation={navigation} />
);

const ButtonsDetailTabView = ({ navigation }) => (
  <ButtonsDetails
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
);

const ButtonsTab = StackNavigator({
  Buttons: {
    screen: ButtonsTabView,
    path: '/',
    headerMode: 'none',
    navigationOptions: {headerVisible: false},
  },
  Button_Detail: {
    screen: ButtonsDetailTabView,
    path: '/buttons_detail',
    navigationOptions: {
      title: 'Buttons Detail',
    },
  },
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default ButtonsTab;
