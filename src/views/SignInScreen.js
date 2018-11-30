
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions,AsyncStorage } from 'react-native';
import { Input, Button,SocialIcon } from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../config/firebase';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');
export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          fontLoaded: false,
          email: '',
          email_valid: true,
          password: '',
          login_failed: false,
          showLoading: false,
          ready: false,
          showToast: false
        };
      }

      async componentDidMount() {
        await Font.loadAsync({
          'georgia': require('../../assets/fonts/Georgia.ttf'),
          'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'light': require('../../assets/fonts/Montserrat-Light.ttf'),
          'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'FontAwesome': require('../../assets/fonts/FontAwesome.ttf'),
          'Material Icons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
          'Material Design Icons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
          'Ionicons': require('../../assets/fonts/Ionicons.ttf'),
        });
    
        this.setState({ fontLoaded: true });
      }
      

      
    static navigationOptions = {
      //title: 'Please sign in',
      header: null
    };
  
    render() {
        const {
          email,
          password,
          email_valid,
          showLoading
        } = this.state;
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
        { this.state.fontLoaded ?
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.travelText}>IVIT</Text>
              </View>
              <View style={{marginTop: -10}}>
                <Text style={styles.descText}>Grab Monk</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Input
                leftIcon={
                  <Icon
                    name='user-o'
                    color='rgba(171, 189, 219, 1)'
                    size={25}
                  />
                }
                containerStyle={{marginVertical: 10}}
                onChangeText={email => this.setState({email})}
                value={email}
                inputStyle={{marginLeft: 10, color: 'white'}}
                keyboardAppearance="light"
                placeholder="Email"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={ input => this.emailInput = input }
                onSubmitEditing={() => {
                  this.setState({email_valid: this.validateEmail(email)});
                  this.passwordInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor="white"
                errorStyle={{textAlign: 'center', fontSize: 12}}
                errorMessage={email_valid ? null : "Please enter a valid email address"}
              />
              <Input
                leftIcon={
                  <Icon
                    name='lock'
                    color='rgba(171, 189, 219, 1)'
                    size={25}
                  />
                }
                containerStyle={{marginVertical: 10}}
                onChangeText={(password) => this.setState({password})}
                value={password}
                inputStyle={{marginLeft: 10, color: 'white'}}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={ input => this.passwordInput = input}
                blurOnSubmit={true}
                placeholderTextColor="white"
              />
            </View>
            <Button
              title='LOG IN'
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.login.bind(this)}
              loading={showLoading}
              loadingProps={{size: 'small', color: 'white'}}
              disabled={ !email_valid && password.length < 8}
              buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
              containerStyle={{marginVertical: 10}}
              titleStyle={{fontWeight: 'bold', color: 'white'}}
            />
            <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
              onPress={this.facebookLogin}
            />
            <View style={styles.footerView}>
              <Text style={{color: 'grey'}}>
                New here?
              </Text>
              <Button
                title="Create an Account"
                clear
                activeOpacity={0.5}
                titleStyle={{color: 'white', fontSize: 15}}
                containerStyle={{marginTop: -10}}
                onPress={() => this.goSignUpScreen()}
              />
            </View>
          </View> :
          <Text>Loading...</Text>
        }
        </ImageBackground>
        </View>
      );
    }
  
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        return re.test(email);
    }
    validatePassword(password) {
        //var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    
        //return re.test(password);
        return password.length >= 8;
    }    


    login() {
      const {
        email,
        password,
        showLoading,
        ready,
      } = this.state;
      let validEmail = this.validateEmail(email);
      let validPassword =  this.validatePassword(password);
      this.setState({
          showLoading: !showLoading,
          email_valid: validEmail || this.emailInput.shake(),
          isPasswordValid: validPassword || this.passwordInput.shake(),
          ready:(this.state.email_valid && this.state.isPasswordValid)?true:false,
          showLoading: false,
      });

      if(validEmail && validPassword){
        this.handleLogin()
          //console.log('signin')
         // AsyncStorage.setItem('userToken', 'abc');
          //this.props.navigation.navigate('App');
      }
    }
    handleLogin = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {AsyncStorage.setItem('userToken', email); this.props.navigation.navigate('App');})
        .catch(error => this.refs.toast.show('Wrong username or password'))
    }

    
    facebookLogin = async () => {
    	  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('262669411090863', {
    	    permissions: ['public_profile','email'],
    	  });
    	  if (type === 'success') {
    	    const response = await fetch(
    	     `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
    	    
    	    const { id, name, email,picture } = await response.json();
    	    
    	    console.log(id);
    	    console.log(name);
    	    console.log(email);
    	    console.log(picture);
    	      AsyncStorage.setItem('userToken', `${token}`); 
      	      this.props.navigation.navigate('App');
    	  }
    	 }
    
  goSignUpScreen = () => {
      this.props.navigation.navigate('SignUp');
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
    loginView: {
      //marginTop: 150,
      backgroundColor: 'transparent',
      width: 250,
      height: 400,
    },
    loginTitle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    travelText: {
      color: 'white',
      fontSize: 40,
      fontFamily: 'bold'
    },
    descText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'regular'
    },
    loginInput: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerView: {
      marginTop: 20,
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });