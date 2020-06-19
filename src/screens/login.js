import React, { Component } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Login extends Component {
  render() {
    return (
        <View>
            <Text>Login !</Text>
            <Button title="Login" onPress={() => this.props.navigation.navigate('dashboard')}/>
        </View>
    );
  }
}

export default Login;