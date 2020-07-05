import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import NavbarDashboard from '../../navbar/navbar-dashboard';
import MyFooter from '../footers/Footer';


export default class Dashboard extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
        colors={['#00AAFF', '#706FD3']}
        style={styles.container}>

        <NavbarDashboard/>
        <View style={styles.mainBody}>
          <Text>
              Dashboard !
          </Text>
          <Text>
              Dashboard !
          </Text>
          <Text>
              Dashboard !
          </Text>
        </View>
        <MyFooter/>
      </LinearGradient>
    );
  }
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
    height: '70%',
    width: '100%',
    position: "absolute",
    bottom: 60,
  }
});

