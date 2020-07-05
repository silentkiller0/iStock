import React, { Component } from 'react';
import {StyleSheet, View, Text, StatusBar, ImageBackground, Footer, Animated} from  'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyFooter from './footers/Footer';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';

class Welcome extends Component {
  
  componentDidMount() {
    setTimeout(() => {
      //this.props.navigation.navigate('loading');
      this.props.navigation.navigate('loading');
    }, 2500);
  }

  render() {

    return (
      <LinearGradient
        start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
        colors={['#00AAFF', '#706FD3']}
        style={styles.bg_image}>

        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

        <ImageBackground
          source={require('../../img/welcome-v2.3.png')}
          style={{width: '100%', height: '100%'}}>

            <MyFooter style={styles.footer}/>

        </ImageBackground>
      </LinearGradient>
      

    );
  }
}

const styles = StyleSheet.create({
  centered: {
      flex: 1,
      padding: 10
    },
    body:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
      height: '100%'
    },
    bg_image:{
      opacity: 1
    },
    footer:{
      flex: 1,
      color: '#fff'
    }
  });

export default Welcome;