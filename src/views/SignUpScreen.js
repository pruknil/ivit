import React, { Component } from 'react';
import { 
  LayoutAnimation,
  Dimensions,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  View, } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../config/firebase';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');
export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      confirmationPasswordValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this,
    )
    this.signup = this.signup.bind(this)
  }

  async componentDidMount() {
    await Font.loadAsync({
          'georgia': require('../../assets/fonts/Georgia.ttf'),
          'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'light': require('../../assets/fonts/Montserrat-Light.ttf'),
          'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    })

    this.setState({ fontLoaded: true })
  }

  signup() {
    LayoutAnimation.easeInEaseOut()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const confirmationPasswordValid = this.validateConfirmationPassword()
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid 
    ) {
      this.setState({ isLoading: true })
      const { email, password } = this.state
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {AsyncStorage.setItem('userToken', 'abc'); this.props.navigation.navigate('App');})
        .catch(error => this.refs.toast.show(error.message))

        LayoutAnimation.easeInEaseOut()
        this.setState({ isLoading: false })
        //Alert.alert('🎸', 'You rock')

    }
  }


  validateEmail() {
    const { email } = this.state
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(email)
    LayoutAnimation.easeInEaseOut()
    this.setState({ emailValid })
    emailValid || this.emailInput.shake()
    return emailValid
  }

  validatePassword() {
    const { password } = this.state
    const passwordValid = password.length >= 8
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state
    const confirmationPasswordValid = password === confirmationPassword
    LayoutAnimation.easeInEaseOut()
    this.setState({ confirmationPasswordValid })
    confirmationPasswordValid || this.confirmationPasswordInput.shake()
    return confirmationPasswordValid
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })
  static navigationOptions = {
      //title: 'Welcome to the app!',

    };
  
    render() {
          const {
      isLoading,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
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
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                errorMessage={emailValid ? null : 'Please enter a valid email address'}
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                errorMessage={passwordValid ? null : 'Please enter at least 8 characters'}
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.confirmationPasswordInput = input)}
                icon="lock"
                value={confirmationPassword}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })}
                placeholder="Confirm Password"
                secureTextEntry
                errorMessage={confirmationPasswordValid ? null : 'The password fields are not identics'}
                returnKeyType="go"
                onSubmitEditing={() => {
                  this.validateConfirmationPassword()
                  this.signup()
                }}
              />
              </View>

            <Button
              title='Sign Up'
              activeOpacity={1}
              underlayColor="transparent"
              loadingProps={{size: 'small', color: 'white'}}
              buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
              containerStyle={{marginVertical: 10}}
              titleStyle={{fontWeight: 'bold', color: 'white'}}
              loading={isLoading}
              onPress={this.signup}
              disabled={isLoading}
            />
              </ImageBackground>
        </View>
      );
    }

  }

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      containerStyle={{marginVertical: 10}}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color='rgba(171, 189, 219, 1)' size={25} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="white"
    />
  )
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
      fontSize: 30,
      fontFamily: 'bold'
    },
    plusText: {
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
    },
   inputStyle: {
    marginLeft: 10, 
    color: 'white',
  },   
  });