import React from 'react';
import Expo, { AppLoading, Asset, Font } from 'expo';

import { View, Image,Text, Dimensions,StyleSheet,AsyncStorage } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Avatar, Button ,Icon} from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MainDrawer from '../drawer/MainDrawer';
import ProfileDrawer from '../drawer/ProfileDrawer';
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>


<View style={styles.headerContainer}>
	<Avatar
	size="large"
	rounded
	source={{uri: props.screenProps.userLogon.picture}}
	/>
  <Text style={styles.heading}>{props.screenProps.userLogon.name}</Text>
</View>
  
  
  
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
    
    
  </View>
);


const MainRoot = DrawerNavigator(
  {
    MainDrawer: {
      path: '/mainDrawer',
      screen: MainDrawer,
    },
    OtherScreen: {
        path: '/proFileScreen',
        screen: ProfileDrawer,
      },

    
  },
  {
    initialRouteName: 'MainDrawer',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);


export default class HomeScreen extends React.Component {
  
	constructor(props) {
		    super(props)
		    this.state = {
		      userLogon:{},
		    }
	}
	  
	state = {
			isReady: false,
	};

  async _loadAssetsAsync() {
    
    await Font.loadAsync({

        'FontAwesome': require('../../assets/fonts/FontAwesome.ttf'),
        'Material Icons': require('../../assets/fonts/MaterialIcons.ttf'),
        'MaterialIcons': require('../../assets/fonts/MaterialIcons.ttf'),
        'MaterialCommunityIcons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
        'Material Design Icons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
        'Ionicons': require('../../assets/fonts/Ionicons.ttf'),
        'Entypo': require('../../assets/fonts/Entypo.ttf'),
      });
  
      this.setState({ fontLoaded: true });
  }

  async componentDidMount() {
	  const retrievedItem =  await AsyncStorage.getItem('userToken');
	  console.log(retrievedItem);
	  const item = JSON.parse(retrievedItem); 
	  this.setState({ userLogon: item });
  }

  
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={ function() {}}
        />
      );
    }

    return (
      <MainRoot screenProps={{userLogon: this.state.userLogon}}/>
    );
  }

  static navigationOptions = {
      header: null
    };
    /*
    render() {
      return (
        <View style={styles.container}>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };*/
  }


const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	  },
	  list: {
	    marginTop: 20,
	    borderTopWidth: 1,
	    borderColor: colors.greyOutline,
	    backgroundColor: '#fff',
	  },
	  headerContainer: {
			flexDirection: 'row',
		    justifyContent: 'flex-start',
		    alignItems: 'center',
		    padding: 40,
		    backgroundColor: '#D291BC',
		  },
	  heading: {
	    color: 'white',
	    marginTop: 10,
	    fontSize: 22,
	    paddingLeft: 10,
	  },
	  fonts: {
	    marginBottom: 8,
	  },
	  user: {
	    flexDirection: 'row',
	    marginBottom: 6,
	  },
	  image: {
	    width: 30,
	    height: 30,
	    marginRight: 10,
	  },
	  name: {
	    fontSize: 16,
	    marginTop: 5,
	  },
	  social: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	  },
	  subtitleView: {
	    flexDirection: 'row',
	    paddingLeft: 10,
	    paddingTop: 5,
	  },
	  ratingImage: {
	    height: 19.21,
	    width: 100,
	  },
	  ratingText: {
	    paddingLeft: 10,
	    color: 'grey',
	  },
	});