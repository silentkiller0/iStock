//import liraries
import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, TextInput, FlatList, Image, Dimensions, Alert, ImageBackground} from  'react-native';
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
          orientation: isPortrait() ? 'portrait' : 'landscape',
          qte_cmd: 1,
          remise: 0,
          prixUnitaire: 0,
          PTTC: 0,
          PTTC_List: false,
          emplacement: "",
          emplacement_List: false,
        };
        
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
          this.setState({
            orientation: isPortrait() ? 'portrait' : 'landscape'
          });
        });
    }

    pttcSelected = (value) => {
      this.setState(
        {
          ...this.state,
          PTTC: value.value,
          PTTC_List: !this.state.PTTC_List,
        }
      )
    }

    emplacementSelected = (value) => {
      this.setState(
        {
          ...this.state,
          emplacement: value.name,
          emplacement_List: !this.state.emplacement_List,
        }
      )
    }

    render() {
        const params = this.props.route.params;
        const product = params ? params.product : null;
        console.log('product : ', product);

        const pttcList = [
          {id: 1, name: "PTTC : 9.95", value: 9.95},
          {id: 2, name: "PTTC : 1.99", value: 1.99},
          {id: 3, name: "PTTC : 4.50", value: 4.50},
        ];
        const emplacementList = [
          {id: 1, name: "Emplecement 1"},
          {id: 2, name: "Emplecement 2"},
          {id: 3, name: "Emplecement 3"},
          {id: 4, name: "Emplecement 4"},
          {id: 5, name: "Emplecement 5"},
        ];


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

                    <Text style={{marginTop: 50, marginLeft: 10, fontSize: 25, fontWeight: "bold"}}>Produit</Text>

                    <CardView cardElevation={10} cornerRadius={5} style={[{paddingBottom: 20, marginBottom: 50}, styles.cardViewStyle]}>
                      <View>
                        <Text style={{marginTop: 15, marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Qte commande</Text>
                        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, flexDirection: "row", borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10, padding: 5}}>
                          <TouchableOpacity onPress={() => this.setState({...this.state,qte_cmd: (this.state.qte_cmd > 1 ? this.state.qte_cmd - 1 : 0)})}>
                            <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/black-minus-v3.png')}/>
                          </TouchableOpacity>
                          {this.state.qte_cmd == 0 ?
                            <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Qte commande*" value={""}/>
                          :
                            <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Qte commande*" value={""+this.state.qte_cmd}/>
                          }
                          <TouchableOpacity onPress={() => this.setState({...this.state,qte_cmd: this.state.qte_cmd + 1})}>
                            <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/black-plus.png')}/>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View>
                        <Text style={{marginTop: 15, marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Remise</Text>
                        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, flexDirection: "row", borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10, padding: 5}}>
                          <TouchableOpacity onPress={() => this.setState({...this.state, remise: (this.state.remise > 1 ? this.state.remise - 1 : 0)})}>
                            <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/black-minus-v3.png')}/>
                          </TouchableOpacity>
                          {this.state.remise == 0 ?
                            <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Remise*" value={""}/>
                          :
                            <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Remise*" value={""+this.state.remise}/>
                          }
                          <TouchableOpacity onPress={() => this.setState({...this.state, remise: this.state.remise + 1})}>
                            <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/black-plus.png')}/>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View>
                        <Text style={{marginTop: 15, marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Prix Unitaire</Text>
                        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, flexDirection: "row", borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10, padding: 5}}>
                          {this.state.prixUnitaire == 0 ?
                            <TextInput style={{flex: 13, marginLeft: 20}} placeholder="PU*" onChangeText={(text) => this.setState({...this.state, prixUnitaire: text})} keyboardType={'decimal-pad'}/>
                          :
                            <TextInput style={{flex: 13, marginLeft: 20}} placeholder="PU*" value={""+this.state.prixUnitaire} onChangeText={(text) => this.setState({...this.state, prixUnitaire: text})} keyboardType={'decimal-pad'}/>
                          }
                          <TouchableOpacity onPress={() => this.setState({...this.state, prixUnitaire: 0}) }>
                            <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/black-cross.png')}/>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View>
                        <Text style={{marginTop: 15, marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Prix TTC</Text>
                        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10}}>
                          <View style={{flexDirection: "row", padding: 5}}>
                            {this.state.PTTC == 0 ?
                              <TextInput style={{flex: 15, marginLeft: 20}} placeholder="PTTC*" keyboardType={'decimal-pad'} onTextInput={""}/>
                            :
                              <TextInput style={{flex: 15, marginLeft: 20}} placeholder="PTTC*" value={""+this.state.PTTC} keyboardType={'decimal-pad'}/>
                            }
                            <TouchableOpacity onPress={() => this.setState({...this.state, PTTC_List: !this.state.PTTC_List})}>
                              <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 30 : 20, height: DeviceInfo.isTablet() ? 30 : 20}} source={require('../../../img/Down-Arrow.png')}/>
                            </TouchableOpacity>
                          </View>
                          {this.state.PTTC_List ? 
                            <View style={{marginTop: 10, borderColor: "#ABCDEF", borderWidth: 0, borderTopWidth: 1, paddingLeft: 30, padding: 5}}>
                              <ScrollView style={{flex: 1}}>
                              {
                                  pttcList.map((item, index) => (
                                    <TouchableOpacity onPress={() => this.pttcSelected(item)}>
              
                                      <View key={index}>
                                        <View style={{width: '15%', borderBottomWidth: 1, borderColor: "#ABCDEF", marginTop: 10, marginBottom: 10}}>
                                          <Text>{item.name}</Text>
                                        </View>
                                      </View>
              
                                    </TouchableOpacity>
                                  ))
                              }
                              </ScrollView>
                            </View>
                          :
                            null
                          }
                        </View>
                      </View>
                          
                      <View>
                        <Text style={{marginTop: 15, marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Emplacement</Text>
                        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, borderColor: "#ABCDEF", borderWidth: 1, borderRadius: 10}}>
                          <View style={{flexDirection: "row", padding: 5}}>
                            <TouchableOpacity onPress={() => this.setState({...this.state,emplacement_List: !this.state.emplacement_List})}>
                              <Image style={{flex: 1, width: DeviceInfo.isTablet() ? 50 : 30, height: DeviceInfo.isTablet() ? 50 : 30}} source={require('../../../img/magnifying-glass.png')}/>
                            </TouchableOpacity>
                            {this.state.emplacement == "" ?
                              <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Emplacement*" value={""}/>
                            :
                              <TextInput style={{flex: 15, marginLeft: 20}} placeholder="Emplacement*" value={""+this.state.emplacement}/>
                            }
                          </View>
                          {this.state.emplacement_List ? 
                            <View style={{marginTop: 10, borderColor: "#ABCDEF", borderWidth: 0, borderTopWidth: 1, paddingLeft: 30, padding: 5}}>
                              <ScrollView style={{flex: 1}}>
                              {
                                  emplacementList.map((item, index) => (
                                    <TouchableOpacity onPress={() => this.emplacementSelected(item)}>
              
                                      <View key={index}>
                                        <View style={{width: '80%', borderBottomWidth: 1, borderColor: "#ABCDEF", marginTop: 10, marginBottom: 20}}>
                                          <Text>{item.name}</Text>
                                        </View>
                                      </View>
              
                                    </TouchableOpacity>
                                  ))
                              }
                              </ScrollView>
                            </View>
                          :
                            null
                          }
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
