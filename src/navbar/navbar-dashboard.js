import React, { Component } from 'react';
import {StyleSheet, View, Text} from  'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class NavbarDashboard extends Component {
  render() {
    return (
      <View style={styles.body}> 
          <Text style={styles.text}>Heelllo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
        height: "20%"
    },
    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
    }
});
