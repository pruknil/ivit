import React from 'react';
import Expo, { AppLoading, Asset, Font } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import MainDrawer from '../drawer/MainDrawer';
import Components from '../drawer/components';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
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
    Components: {
      path: '/components',
      screen: Components,
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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class HomeScreen extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    
    await Font.loadAsync({
        'georgia': require('../../assets/fonts/Georgia.ttf'),
        'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'light': require('../../assets/fonts/Montserrat-Light.ttf'),
        'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'FontAwesome': require('../../assets/fonts/FontAwesome.ttf'),
        'Material Icons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
        'Material Design Icons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
        'Ionicons': require('../../assets/fonts/Ionicons.ttf'),
        'Entypo': require('../../assets/fonts/Entypo.ttf'),
      });
  
      this.setState({ fontLoaded: true });
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
      <MainRoot />
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
