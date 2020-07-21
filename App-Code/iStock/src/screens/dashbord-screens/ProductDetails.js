//import liraries
import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, FlatList, Image, Dimensions, Alert, ImageBackground} from  'react-native';
import { Card, Button } from 'react-native-elements'
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
            cardViewStyle: {
              width: '95%',
              height: 350,
              margin: 10,
              // marginBottom: 20,
            },
            cardViewStyle1: {
              paddingTop: 10,
              alignItems: 'center',
              flexDirection: 'row',
              width: '95%',
              //height: 150,
            },
            article: {
              //alignItems: 'center',
              margin: 20,
              width: '100%'
            },
            ic_and_details: {
              flexDirection: 'row',
              margin: 3,
              //alignItems: 'center',
            },
            aname: {
              width: '60%',
            },
            articlename: {
              color: '#00AAFF',
              fontSize: 50,
              //marginBottom: 15,
            },
            aref: {
              width: '40%',
            },
            ref: {
              fontSize: 15,
              fontWeight: "bold"
            },
            iconDetails: {
              marginRight: 10,
              color: '#00AAFF',
            },
            pricedetails: {
              flexDirection: 'row',
              width: '100%',
            },
            price: {
              width: '75%',
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
                  
                    <View>
                      <Text>{JSON.stringify(product)}</Text>
                    </View>

                    <CardView cardElevation={10} cornerRadius={5} style={styles.cardViewStyle}>
                      <View style={styles.cardViewStyle1}>
                        <View style={[styles.article, {flexDirection: "row"}]}>
                          <View>
                            <Image style={{width: DeviceInfo.isTablet() ? 300 : 50, height: DeviceInfo.isTablet() ? 300 : 50}} source={require('../../../img/no_image.jpeg')}/>
                          </View>
                          <View style={{flex: 1, marginLeft: 40}}>
                            <View style={styles.ic_and_details}>
                              <View style={styles.aname}>
                                <Text style={styles.articlename}>{product.name}</Text>
                                <View style={{flexDirection: "row", marginTop: 10, marginBottom: 50}}>
                                  <Text>Référence : </Text>
                                  <Text style={styles.ref}>{product.ref}</Text>
                                </View>
                              </View>
                            </View>
                            <View style={[styles.ic_and_details]}>
                              <View>
                                <Text>Description : </Text>
                                <Text>XXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXX XXXXXXXXXXX XX XXXXX XX  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Text>
                              </View>
                            </View>
                            <View style={[styles.ic_and_details, {marginTop: 40}]}>
                              <Icon name="boxes" size={15} style={styles.iconDetails} />
                              <Text> XXX en stock</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </CardView>

                    <Text style={{marginTop: 50, marginLeft: 10, fontSize: 20, fontWeight: "bold"}}>Produit</Text>

                    <CardView cardElevation={10} cornerRadius={5} style={styles.cardViewStyle}>
                      <View style={styles.cardViewStyle1}>
                        <View style={[styles.article, {flexDirection: "row", borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10, padding: 5}]}>
                          <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/no_image.jpeg')}/>
                          <Text style={{flex: 6, }}>Qte commande </Text>
                          <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/no_image.jpeg')}/>
                        </View>
                      </View>
                    </CardView>
                      
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
