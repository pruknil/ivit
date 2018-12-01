import React, { Component } from 'react';
import { 
  LayoutAnimation,
  Dimensions,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  View,Text } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../config/firebase';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const BG_IMAGE = require('../../assets/images/bg_screen3.jpg');

export default class ProfileScreen extends React.Component {
	
	  constructor(props) {
		    super(props)

		    this.state = {
		      isLoading: false,
		      selectedType: null,
		      fontLoaded: false,
		      userLogon:{},

		    }


		  }

		  async componentDidMount() {
		    await Font.loadAsync({
		          'georgia': require('../../assets/fonts/Georgia.ttf'),
		          'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
		          'light': require('../../assets/fonts/Montserrat-Light.ttf'),
		          'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
		    })

		    this.setState({ fontLoaded: true });
		    
		    const retrievedItem =  await AsyncStorage.getItem('userToken');
		    console.log(retrievedItem);
		    const item = JSON.parse(retrievedItem);
		    this.setState({ userLogon: item });
		  }

		  updateProfile() {
		    LayoutAnimation.easeInEaseOut()


		      this.setState({ isLoading: true })
		      const { email, password } = this.state

		        this.setState({ isLoading: false })
		  }


		    static navigationOptions = {
		      //title: 'Please sign in',
		      header: null
		    };
		  
		    render() {
		     const {
		      isLoading,

		    } = this.state

		      return (
		        <View style={styles.container}>
		          <Toast
		              ref="toast"
		              style={{backgroundColor:'red'}}
		              position='top'
		              positionValue={200}
		              fadeInDuration={750}
		              fadeOutDuration={1000}
		              opacity={0.8}
		              textStyle={{color:'white'}}
		          />
		        <ImageBackground source={BG_IMAGE} style={styles.bgImage} >
		        <View style={{width: '80%', alignItems: 'center'}}>

		        <Input containerStyle={styles.inputContainerStyle} placeholder="Contact Number" />
		        </View>
		        <Text numberOfLines={5}>
		          {this.state.userLogon.email}
		        </Text>
	            <Button
	              title='Update Profile'
	              loading={false}
	              loadingProps={{size: 'small', color: 'white'}}
	              buttonStyle={{backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5}}
	              titleStyle={{fontWeight: 'bold', fontSize: 23}}
	              containerStyle={{marginVertical: 10, height: 50, width: 230}}
	              onPress={() => console.log('aye')}
	              underlayColor="transparent"
	            />
		            
	  	            <Button
		              title='Sign Out'
		              loading={false}
		              loadingProps={{size: 'small', color: 'white'}}
		              buttonStyle={{backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5}}
		              titleStyle={{fontWeight: 'bold', fontSize: 23}}
		              containerStyle={{marginVertical: 10, height: 50, width: 230}}
		              onPress={this._signOutAsync}
		              underlayColor="transparent"
		            />
	            	  </ImageBackground>
		        </View>
		      );
		    }
  
    _signOutAsync = async () => {
    	console.log('_signOutAsync')
      await AsyncStorage.clear();
      this.props.navigation.navigate('SignIn');
    };
  }


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    bgImage: {
      flex: 1,
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainerStyle: {
        marginTop: 16,
        width: '90%',
      },
  });