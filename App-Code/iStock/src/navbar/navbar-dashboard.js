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
          <View>
            <TouchableOpacity
              onPress={updateSecureTextEntry}>
              <Image style={{width: 150, height: 150 }} source={require('../../img/power-off.png')}/>                  
            </TouchableOpacity>
          </View>
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
