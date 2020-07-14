import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, BackHandler, Alert, AsyncStorage} from  'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DeviceInfo from 'react-native-device-info';

export default class NavbarDashboard extends Component {
  constructor(props){
    super(props); 
  }

  /*
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.existPressed);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.existPressed);
  }
  */
  
  existPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => this.leaving(false)},
        {text: 'Yes', onPress: () => this.leaving(true)},
      ],
      { cancelable: false });
      return true;
  }

  async leaving(isLeaving){
    if(isLeaving == true){
      await AsyncStorage.removeItem('token');
      BackHandler.exitApp();
    }else{
      console.log('Cancel Pressed');
    }
  }

  render() {
    const disconnect = () => {
      // const navigate = this.props.navigation;
      // console.log(navigate);
      // navigate.navigation.navigate('commande');
      //this.existPressed();
    }

    return (
      <View style={styles.body}> 
          <Text style={styles.text}></Text>

        <TouchableOpacity
          onPress={() => disconnect()}>
          <Image style={styles.power_image} source={require('../../img/power-off.png')}/>                  
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
        height: "20%",
        width: "100%",
        flexDirection: 'row',
        // backgroundColor: 'black'
    },
    text: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    power_image: {
      width: DeviceInfo.isTablet() ? 40 : 20, 
      height: DeviceInfo.isTablet() ? 40 : 20,
      margin: 10
    }
});
