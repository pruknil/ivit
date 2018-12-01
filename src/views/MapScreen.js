import React from 'react';
import { MapView } from "expo";

import { View, Image,Text, Dimensions,StyleSheet } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Avatar, Button ,FormLabel, FormInput, Icon } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MainDrawer from '../drawer/MainDrawer';
import OtherScreen from '../views/OtherScreen';
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;



const LAT_DELTA = 0.005;
const LONG_DELTA = 0.005;

export default class MapScreen extends React.Component {
  
	 constructor(props) {
		    super(props);

		    this.state = {
		      region: {
		        latitude: 40.76727216,
		        longitude: -73.99392888,
		        latitudeDelta: LAT_DELTA,
		        longitudeDelta: LONG_DELTA
		      },
		      isLoadingLib: true,
		      isLoadingWiFi: true,
		      length: 0,
		      pressed: false,
		      buttonTitle: "Filter",
		      buttonIcon: "filter-list"
		    };

		    this.zip = "";
		    this.textInputRef = null;
		  }



  render() {
	  const { navigation } = this.props;
	  const temple = navigation.getParam('temple', 'NO-ID');
	  this.state.region.latitude = temple.lat;
	  this.state.region.longitude = temple.lng;
      return (
    	      <View style={styles.container}>
    	        <MapView
    	          style={styles.container}
    	          provider="google"
    	          region={this.state.region}
    	        showsMyLocationButton={true}
    	          showsUserLocation={true}
    	        >

    	        </MapView>

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
	  buttonStyle: {
		    flex: 1,
		    position: "absolute",
		    top: 40,
		    left: 20,
		    right: 20,
		    height: 20
		  },
		  innerStyle: {
		    backgroundColor: "rgba(92, 99,216, .2)",
		    height: 45,
		    borderColor: "transparent",
		    borderWidth: 0,
		    borderRadius: 5
		  },
		  viewStyle: {
		    position: "absolute",
		    top: 145,
		    left: 20,
		    right: 20,
		    backgroundColor: "#fff",
		    borderRadius: 6,
		    borderColor: "transparent"
		  },
	});