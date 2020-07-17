//import liraries
import React, { Component } from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, FlatList, Image, Dimensions, Alert, ImageBackground} from  'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import NavbarDashboard from '../../navbar/navbar-dashboard';
import MyFooter from '../footers/Footer';
import DeviceInfo from 'react-native-device-info';
import ProductDetailButton from './assets/ProductDetailButton';

// create a component
class ProductDetails extends Component {
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


    render() {
        const params = this.props.route.params;
        const product = params ? params.product : null;
        console.log('product : ', product);


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
        });


        return (
            <LinearGradient
                start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
                colors={['#00AAFF', '#706FD3']}
                style={styles.container}>

                <NavbarDashboard navigation={ this.props } textTittleValue={"Produit " + product.name}/>
                <View style={styles.mainBody}>

                <ScrollView style={{flex: 1}}>
                
                    
                </ScrollView>

                

                
                {/* Main twist button */}
                <ProductDetailButton navigation={this.props.navigation}/>
                {/* END Main twist button */}

                </View>
                <MyFooter/>
            </LinearGradient>
        );
    }
}

//make this component available to the app
export default ProductDetails;
