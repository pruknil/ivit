

import React, { Component } from 'react';
import {View, ScrollView, Text, StatusBar, SafeAreaView ,RefreshControl} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../components/SliderEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1} from '../static/entries';
import { Input, SearchBar, Icon, Button } from 'react-native-elements'
import {
	Body,
	  List,
	  ListItem,
	  Thumbnail,
	  Left,
	  Right
	} from "native-base";
import Moment from 'moment';
const SLIDER_1_FIRST_ITEM = 1;


class Main extends Component {
	_listData = async () => {
		/*
			  const queryString = this._objToQueryString({
				    lat: this.state.location.coords.latitude,
				    lng: this.state.location.coords.longitude,
				    name: 'วัด',
				});*/
		    this.setState({refreshing: true});
		    var headers = new Headers();
		    headers.append("Authorization", "Basic dXNlcjp1c2Vy");
		    return fetch(`https://ivit.azurewebsites.net/api/booking/list`,{method: "GET", headers: headers})
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
		  
		  componentDidMount(){
		    this._listData();
		  }
		  
  constructor (props) {
    super(props);
    this.state = {
    		refreshing: false,
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        dataSource: [],
    };
}

_renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
}
    mainExample (number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
        <View style={styles.exampleContainer}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={ENTRIES1}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              // inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              //autoplay={true}
              //autoplayDelay={500}
              //autoplayInterval={5000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
            <Pagination
              dotsLength={ENTRIES1.length}
              activeDotIndex={slider1ActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={colors.black}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
        </View>
    );
}

render () {
    const example1 = this.mainExample(1, 'Default');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <StatusBar
                  translucent={true}
                  backgroundColor={'rgba(0, 0, 0, 0.3)'}
                  barStyle={'light-content'}
                />
                { this.gradient }
                <ScrollView
                  style={styles.scrollview}
                  scrollEventThrottle={200}
                  directionalLockEnabled={true}
    		    refreshControl={
      		          <RefreshControl
      		            refreshing={this.state.refreshing}
      		            onRefresh={this._listData}
      		          />
      		        }
                >
                
             <View style={[styles.headerContainer]}>
                { example1 }
              </View>
              
              
                <List
                dataArray={this.state.dataSource}
                renderRow={data =>
                  <ListItem avatar>
                    <Left>
                    {data.status}
                    </Left>
                    <Body>
                      <Text>
                        {data.text}
                      </Text>
                      <Text numberOfLines={2} note>
                      {data.templeName} {data.objective} พระ {data.quantity} รูป 
                        
                      </Text>
                    </Body>
                    <Right>
                      <Text note>
                        {Moment(data.fromdate).format('MMM D','th')}
                      </Text>
                    </Right>
                  </ListItem>}
              />             
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
}


export default Main;
