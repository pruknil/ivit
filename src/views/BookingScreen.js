import React from 'react';
import { MapView } from "expo";

import { View, Image, Dimensions,StyleSheet} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Avatar,  FormLabel, FormInput} from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
	  Content,
	  Picker,Label,Input,Item,
	  Form , Icon ,Button,Text} from "native-base";
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemP = Picker.Item;
export default class BookingScreen extends React.Component {
  
	 constructor(props) {
		    super(props);

		    this.state = {
		    		isLoading: false,
	                refreshing: false,
		    		selected1: "key1",
		    		dataSource: [],
		    		quantity: 0,
		    		contactTel: "",
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
		  
	  onValueChange(value: string) {
		    this.setState({
		      selected1: value
		    });
	  }
	  
  render() {
	  const { navigation } = this.props;
	  const temple = navigation.getParam('temple', 'NO-ID');
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
			              selectedValue={this.state.selected1}
			              onValueChange={this.onValueChange.bind(this)}
			            >
			              {this.state.dataSource.map((l, i) => (
			            		  <ItemP label={l.name} value={l.name} key={i} />
						   ))}
			            	  
			            </Picker>
		            </Item>
	                <Item fixedLabel>
	                  <Label>จำนวนพระ</Label>
	                  <Input onChangeText={quantity => this.setState({quantity})} keyboardType='numeric'/>
	                </Item>
	                <Item fixedLabel>
	                  <Label>เบอร์ติดต่อ</Label>
	                  <Input keyboardType='numeric'/>
	                </Item>
	          </Form>
	          <Button block style={{ margin: 15, marginTop: 50 }}>
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