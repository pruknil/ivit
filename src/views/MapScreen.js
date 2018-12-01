import React from 'react';
import Expo, { AppLoading, Asset, Font } from 'expo';

import { View, Image,Text, Dimensions,StyleSheet } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Avatar, Button ,Icon} from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MainDrawer from '../drawer/MainDrawer';
import OtherScreen from '../views/OtherScreen';
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;




export default class MapScreen extends React.Component {
  
	state = {
			isReady: false,
	};



  render() {
	  
      return (
    	        <View style={styles.container}>
    	          <Button title="Map"/>
    	        </View>
      );

  }

  static navigationOptions = {
      header: null
    };

  }


const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	  },

	});