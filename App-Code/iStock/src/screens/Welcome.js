import React, { Component } from 'react';
import {StyleSheet, View, Text, Footer, Animated} from  'react-native';
import MaskedView from '@react-native-community/masked-view';
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
      this.props.navigation.navigate('loading');
    }, 2500);
  }

  render() {

    return (
      <View style={styles.centered}>
        <View style={styles.body}>
        <Text style={styles.title_h1}>iStock</Text>
        </View>

        <View style={styles.footer}>
          <Text>Created by BDC/JDevs10</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
      flex: 1,
      backgroundColor: "#00AAFF",
      padding: 10
    },
    body:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    title_h1:{
      fontSize: 50,
      color: "#ABCDEF",
      fontWeight: "bold"
    },
    fotter:{
      flex: 1,
      backgroundColor: "#000",
    }
  });

export default Welcome;