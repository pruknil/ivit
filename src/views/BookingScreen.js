import React from 'react';
import { MapView ,Location} from "expo";

import { View, Image, Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Avatar,  FormLabel, FormInput} from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
	  Content,
	  Picker,Label,Input,Item,
	  Form , Icon ,Button,Text} from "native-base";
import DateTimePicker from 'react-native-modal-datetime-picker';
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemP = Picker.Item;
export default class BookingScreen extends React.Component {
  
	 constructor(props) {
		    super(props);

		    this.state = {
		    		 isDateTimePickerVisible: false,
		    		isLoading: false,
	                refreshing: false,
	                objective: "",
	                payment: "",
		    		dataSource: [],
		    		quantity: 0,
		    		tel: "",
		    		fromdate:new Date(),
		    };
	}
	  componentDidMount(){
		    this._getActivity();
		  }
		  
	  _getActivity = async () => {

		    this.setState({refreshing: true});
		    var headers = new Headers();
		    headers.append("Authorization", "Basic dXNlcjp1c2Vy");
		    return fetch(`https://ivit.azurewebsites.net/api/objective/list`,{method: "GET", headers: headers})
		      .then((response) => response.json())
		      .then((responseJson) => {

		        this.setState({
		          refreshing: false,
		          dataSource: responseJson,
		        }, function(){

		        });

		      })
		      .catch((error) =>{
		        console.error(error);
		      });
		  };
		  
		  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
		  
		  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
		 
		  _handleDatePicked = (date) => {
		    console.log('A date has been picked: ', date);
		    this.setState({
		    	fromdate: date
		    });
		    this._hideDateTimePicker();
		  };
	  
 
		  _doBooking = async () => {
			  console.log('doBooking')
			  
		    let location = await Location.getCurrentPositionAsync({});
			    const retrievedItem =  await AsyncStorage.getItem('userToken');
			    console.log(retrievedItem);
			    const userLogon = JSON.parse(retrievedItem);

		    
	  const { navigation } = this.props;
	  const temple = navigation.getParam('temple', '');
			  console.log(temple)
			    this.setState({refreshing: true});
			    var headers = new Headers();
			    headers.append("Authorization", "Basic dXNlcjp1c2Vy");
			    headers.append("Accept", "application/json");
			    headers.append("Content-Type", "application/json");
			    var body = JSON.stringify({
			    	objective: this.state.objective,
			    	email:userLogon.email,
			    	payment: this.state.payment,
			    	templeId: temple.placeId,
			    	lat: location.coords.latitude,
			    	lng: location.coords.longitude,
			    	quantity: this.state.quantity,
			    	fromdate:this.state.fromdate,
			    	status: '0',
			      })
			    
			    return fetch(`https://ivit.azurewebsites.net/api/booking/create`,{method: "POST", headers: headers,body:body})
			      .then((response) => {
			    	  console.log(response)
				        this.setState({
				          refreshing: false,
				          

				          
				          
				        }, function(){

				        });

				      })
			      .catch((error) =>{
			        console.error(error);
			      });
			  };
			  
	onSelectObjective(value: string) {
		    this.setState({
		    	objective: value
		    });
	}
	
	onSelectPayment(value: string) {
		this.setState({
			payment: value
		});
	  }
 
  render() {

      return (
	      <View style={styles.container}>

	        <Content>
	          <Form>
	          		<Item fixedLabel>
		          		<Label>กิจนิมนต์</Label>
		  	            <Picker
			              mode="dropdown"
			              iosHeader="เลือกกิจนิมนต์"
			              iosIcon={<Icon name="ios-arrow-down-outline" />}
			              style={{ width: undefined }}
			              selectedValue={this.state.objective}
			              onValueChange={this.onSelectObjective.bind(this)}
			            >
			              {this.state.dataSource.map((l, i) => (
			            		  <ItemP label={l.name} value={l.name} key={i} />
						   ))}
			            	  
			            </Picker>
		            </Item>
		            
		            

			            
		                <Item fixedLabel>
		                  <Label>เวลารับกิจ</Label>
			                <TouchableOpacity onPress={this._showDateTimePicker}>
			                  <Text>เลือกวันเวลา</Text>
			                </TouchableOpacity>
			                <DateTimePicker
			                  isVisible={this.state.isDateTimePickerVisible}
			                  onConfirm={this._handleDatePicked}
			                  onCancel={this._hideDateTimePicker}
			                  mode="datetime"
			                />
		                </Item>

	                <Item fixedLabel>
	                  <Label>จำนวนพระ</Label>
	                  <Input onChangeText={quantity => this.setState({quantity})} keyboardType='numeric'/>
	                </Item>
	                <Item fixedLabel>
	                  <Label>เบอร์ติดต่อ</Label>
	                  <Input onChangeText={tel => this.setState({tel})} keyboardType='numeric'/>
	                </Item>
		          	<Item fixedLabel>
		          		<Label>การชำระเงิน</Label>
		  	            <Picker
			              mode="dropdown"
			              iosHeader="เลือกการชำระเงิน"
			              iosIcon={<Icon name="ios-arrow-down-outline" />}
			              style={{ width: undefined }}
			              selectedValue={this.state.payment}
			              onValueChange={this.onSelectPayment.bind(this)}
			            >
			              	<ItemP label='บัตรเครดิต' value='บัตรเครดิต'/>
			            	<ItemP label="เก็บเงินปลายทาง" value="เก็บเงินปลายทาง"/>
			            	<ItemP label="KPlus" value="KPlus"/>
			            </Picker>
		            </Item>
	          </Form>
	          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this._doBooking}>
	            <Text>Booking</Text>
	          </Button>
	        </Content>
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