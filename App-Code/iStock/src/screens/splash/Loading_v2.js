import React, { Component } from 'react';
import {StyleSheet, View, Text, Animated, Easing} from  'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
// import { Easing } from 'react-native-reanimated';


class Loading extends Component {
  
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.props.navigation.navigate('login');
  //   }, 10000);
  // }

 state = new Animated.Value(0);

  spin(){
    this.state.setValue(0);
    Animated.sequence([
      Animated.timing(
        this.state,{
          toValue: 10,
          duration: 100000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
      // Animated.timing(
      //   this.state,{
      //     toValue: 0,
      //     duration: 500,
      //     // easing: Easing.linear,
      //     // useNativeDriver: true
      //   }
      // )
    ]).start(() => this.spin());
  }

  // componentDidMount(){
  //   this.spin();
  //   setTimeout(() => {
  //     this.props.navigation.navigate('login');
  //   }, 11000);
  // }


  render() {

    const spin1 = this.state.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const spin2 = this.state.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const spin3 = this.state.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.container}>
          <View style={styles.spinner}>
            <View><Text style={styles.spinnerText}>Chargement...</Text></View>

            <Animated.Image style={{transform: [{rotate: spin1}]}} source={require('../../../img/welcome.png')}/>

            {/* <Animated.View style={[styles.spinnerSector, styles.spinnerSector_clearBlue, {transform: [{rotate: spin1}] }]}></Animated.View>
            <Animated.View style={[styles.spinnerSector, styles.spinnerSector_blueBlue, {transform: [{rotate: spin2}] }]}></Animated.View>
            <Animated.View style={[styles.spinnerSector, styles.spinnerSector_darckBlue, {transform: [{rotate: spin3}] }]}></Animated.View> */}

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    spinner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      height: 300,
      position: "relative",
      // backgroundColor: "#ABCFFF"
    },
    spinnerText:{
      fontSize: 35,
      color: "#ABCDEF",
      fontWeight: "bold"
    },
    spinnerSector:{
      borderRadius: 150,
      position: "absolute",
      // top: -150,
      // left: -150,
      width: 300,
      height: 300,
      // backgroundColor: "#FFFFFF00",
      // borderColor: "#FFFFFF00",
      borderWidth: 20
    },
    spinnerSector_clearBlue: {
      borderStyle: "solid",
      borderTopColor: "#FF0000"
    },
    spinnerSector_blueBlue: {
      borderStyle: "solid",
      borderTopColor: "#00FF00"
    },
    spinnerSector_darckBlue: {
      borderStyle: "solid",
      borderTopColor: "#0000FF"
    }
  });

export default Loading;