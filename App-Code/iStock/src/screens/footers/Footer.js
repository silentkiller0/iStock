//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// create a component
class MyFooter extends Component {
    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.text}>© iStock - Développer par l'agence Anexys</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    body:{
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: '5%'
    },
    text: {
        color: '#fff'
    }
});

//make this component available to the app
export default MyFooter;
