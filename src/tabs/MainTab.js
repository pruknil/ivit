import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ButtonsHome from '../views/Main';

const ButtonsTabView = ({ navigation }) => (
  <ButtonsHome navigation={navigation} />
);



const ButtonsTab = StackNavigator({
  Buttons: {
    screen: ButtonsTabView,
    path: '/',
    headerMode: 'none',
    navigationOptions: {headerVisible: false},
  },


},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default ButtonsTab;
