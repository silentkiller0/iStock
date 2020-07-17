//import liraries
import React, { Component } from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, FlatList, Image, Dimensions, Alert, ImageBackground} from  'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import NavbarDashboard from '../../navbar/navbar-dashboard';
import MyFooter from '../footers/Footer';
import DeviceInfo from 'react-native-device-info';
import OrderDetailButton from './assets/OrderDetailButton';

// create a component
class CommandeDetails extends Component {
    constructor(props){
        super(props);
    
        /**
         * Returns true if the screen is in portrait mode
         */
        const isPortrait = () => {
          const dim = Dimensions.get('screen');
          return dim.height >= dim.width;
        };
    
        /**
        * Returns true of the screen is in landscape mode
        */
        const isLandscape = () => {
          const dim = Dimensions.get('screen');
          return dim.width >= dim.height;
        };
    
        this.state = {
          orientation: isPortrait() ? 'portrait' : 'landscape'
        };
        
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
          this.setState({
            orientation: isPortrait() ? 'portrait' : 'landscape'
          });
        });
    }

    productDetails = (value) => {
      alert('Obj: \n' + JSON.stringify(value));
      this.props.navigation.navigate("ProductDetails", {product: value});
    }


    render() {
        // console.log('this.props.navigation : ', this.props.route.params);
        
        const params = this.props.route.params;
        const order = params ? params.order : null;
        console.log('order : ', order);


        if (this.state.orientation === 'portrait') {
            console.log('orientation : ', this.state.orientation);
        }
        else {
            console.log('orientation : ', this.state.orientation);
        }
      
        const styles = StyleSheet.create({
            container: {
              flex: 1,
            },
            mainBody: {
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingHorizontal: 20,
              paddingVertical: 30,
              height: this.state.orientation === 'portrait' ? '80%' : '60%',
              width: '100%',
              position: "absolute",
              bottom: this.state.orientation === 'portrait' ? "10%" : "20%",
            },
            listItemBody: {
              flexDirection: "row",
              height: "auto",
              width: '100%', 
              // borderWidth: 2,
              // borderRadius: 10,
              // borderColor: '#777777',
              padding: 10,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 15,
              },
              shadowOpacity: 0.66,
              shadowRadius: 20,
              elevation: 10,
            },
            listItemBody_layout: {
              //flex: 1,
              flexDirection: "row",
            },
        });
      

        return (
            <LinearGradient
                start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
                colors={['#00AAFF', '#706FD3']}
                style={styles.container}>

                <NavbarDashboard navigation={ this.props } textTittleValue={"Commande " + order.ref}/>
                <View style={styles.mainBody}>

                <ScrollView style={{flex: 1}}>
                {
                    order.lines.map((item) => (
                      <TouchableOpacity onPress={() => this.productDetails(item)}>
                        <View style={styles.listItemBody}>
                            <View style={{flex: 1}}>
                                {/* <Text>- {item.img} -</Text> */}
                                <Image style={{width: DeviceInfo.isTablet() ? 60 : 50, height: DeviceInfo.isTablet() ? 60 : 50}} source={require('../../../img/no_image.jpeg')}/> 
                            </View>
                            <View style={{flex: 2}}>
                                <Text>{item.ref}</Text>
                                <Text>{item.name}</Text>
                            </View>
                            <View>
                                <Text>{item.prixTTC}</Text>
                            </View>
                        </View>
                      </TouchableOpacity>
                    ))
                }
                    
                </ScrollView>

                

                
                {/* Main twist button */}
                <OrderDetailButton navigation={this.props.navigation}/>
                {/* END Main twist button */}

                </View>
                <MyFooter/>
            </LinearGradient>
        );
    }
}

// define your styles


//make this component available to the app
export default CommandeDetails;
