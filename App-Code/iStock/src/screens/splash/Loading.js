import React, { Component } from 'react';
import {StyleSheet, View, StatusBar, Text, ImageBackground, Image, AsyncStorage} from  'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyFooter from '../footers/Footer';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import FindServers from '../../tasks/FindServers';
  

class Loading extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadingNotify: 'chargement...',
      isServers: false
    };
  }
  
  async componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.navigate('login');
    // }, 2500);

    setTimeout(() => {
      this.setState({
        ...this.state,
        loadingNotify: 'Téléchargement des configs du serveur...'
    });
    }, 3000);

    const response_data = {
      isServers: false
    };

    //check if tocken exist already
    if(await AsyncStorage.getItem('token') != null && await AsyncStorage.getItem('token') != ""){
      // console.log('smt', await AsyncStorage.getItem('token'));
      this.props.navigation.navigate('download');
      return;
    }

    const server = new FindServers();
    const res = await server.getAllServerUrls().then(async (val) => {
      // console.log('servers 2 : ');
      // console.log(val);
      return val;
    });

    // console.log('servers 3 : ');
    // console.log(res);

    if(res == true){
      setTimeout(() => {
        this.props.navigation.navigate('login');
      }, 2500);
    }else{
      //alert("Le serveur Big Data Consulting n'est pas joignable...\n");
      this.props.navigation.navigate('dashboard');
    }
  }

  render() {

    return (
        <LinearGradient
          start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
          colors={['#00AAFF', '#706FD3']}
          style={styles.body}>

          <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

          <Image style={{width: 150, height: 150 }} source={require('../../../img/Loading-white.gif')}/>

          <Text style={styles.text}>{this.state.loadingNotify}</Text>

          <MyFooter/>

        </LinearGradient>
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
    width: '100%', 
    height: '100%'
  },
  text:{
    fontSize: 20,
    color: "#ABCDEF",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  }
});