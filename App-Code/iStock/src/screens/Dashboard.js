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
import NavbarDashboard from '../navbar/navbar-dashboard'


export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.backgroundColor}>
        <NavbarDashboard></NavbarDashboard>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
      backgroundColor: "#000",
  },
  mainBody: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 10,
      height: "100%"
  }
});

