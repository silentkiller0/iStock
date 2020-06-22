import React, { Component } from 'react';
import {StyleSheet, View, Text, Image} from  'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  

class Loading extends Component {
  
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('login');
    }, 2500);
  }

  render() {

    return (
      <View style={styles.centered}>
          <View style={styles.body}>
            <Image style={{width: 350, height: 350 }} source={require('../../../img/loading-gears-blue.gif')}/>
            <Text style={styles.title_h1}>Loading....</Text>
          </View>
      </View>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: "#00AAFF",
    padding: 10
  },
  body:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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