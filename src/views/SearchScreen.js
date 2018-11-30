import Expo from 'expo';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions,ActivityIndicator ,RefreshControl} from 'react-native';
import { Input, SearchBar, Icon, Button,  ListItem, } from 'react-native-elements'

import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'HSColors';
const SCREEN_WIDTH = Dimensions.get('window').width;


const dummySearchBarProps = {
  showLoading: false,
  onFocus: () => console.log("focus"),
  onBlur: () => console.log("blur"),
  onCancel: () => console.log("cancel"),
  onClearText: () => console.log("cleared"),
  onChangeText: text => console.log("text:", text),
}

class Search extends Component {
	  constructor(props){
		    super(props);
		    this.state = { isLoading: false,
		                   refreshing: false,
		                   dataSource: [],
		                   selectedMap:{}
		                  }
		  }


		  componentDidMount(){
		    this._listData();
		  }
		  
		  _objToQueryString(obj) {
			  const keyValuePairs = [];
			  for (const key in obj) {
			    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
			  }
			  return keyValuePairs.join('&');
			}
		  
		  _listData = () => {
			  const queryString = this._objToQueryString({
				    lat: '13.6735127',
				    lng: '100.4902452',
				    name: 'วัด',
				});
		    this.setState({refreshing: true});
		    var headers = new Headers();
		    headers.append("Authorization", "Basic dXNlcjp1c2Vy");
		    return fetch(`https://ivit.azurewebsites.net/api/map/temple?${queryString}`,{method: "GET", headers: headers})
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
		  }

		  onPress = (name) => {
			  console.log(name);
			}

		  render() {

		    if(this.state.isLoading){
		      return(
		        <View style={{flex: 1, padding: 20}}>
		          <ActivityIndicator/>
		        </View>
		      )
		    }


		    return (
		<View style={styles.container}>
		  <SearchBar lightTheme={true} placeholder="ค้นหา" {...dummySearchBarProps}  containerStyle={styles.searchbar} />
		  <ScrollView keyboardShouldPersistTaps="handled"
		    refreshControl={
		          <RefreshControl
		            refreshing={this.state.refreshing}
		            onRefresh={this._listData}
		          />
		        }>
		      <View style={styles.list}>
		          {this.state.dataSource.map((l, i) => (
		            <ListItem
		              leftAvatar={{ rounded: true, source: { uri: l.picture } }}
		              key={i}
		              onPress={() => this.onPress(l.starttime)}
		              title={l.name}
		              subtitle={l.starttime}
		              chevron
		              bottomDivider
		            />
		          ))}
		      </View>
		  </ScrollView>
		</View>
		    )
		  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#B46486'
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  searchbar: {
    marginTop: 20,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent'
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent'
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
  list: {
    marginTop: 0,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
    
  },
});
export default Search;
