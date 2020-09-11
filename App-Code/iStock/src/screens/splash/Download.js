import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, StatusBar, AsyncStorage} from  'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyFooter from '../footers/Footer';
import FindCommandes from '../../services/FindCommandes';
import TokenManager from '../../Database/TokenManager';
  

class Download extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadingNotify: 'Initialiser les Téléchargements...',
    };
  }
  
  async componentDidMount() {

    //find token
    const tm = new TokenManager();
    await tm.initDB();
    const token = await tm.GET_TOKEN_BY_ID(1).then(async (val) => {
      return await val;
    });
    console.log('token : ', token);

    if(token == null){
      this.setState({
        ...this.state,
        loadingNotify: 'Token Error.'
      });
      return;
    }
    
    setTimeout(() => {
      this.setState({
        ...this.state,
        loadingNotify: 'Téléchargement des Commandes associer à ' + token.name + '...'
      });
    }, 3000);

    /*
    const findCommandes = new FindCommandes();
    const res = await findCommandes.getAllOrdersFromServer(token).then(async (val) => {
      console.log('findCommandes.getAllOrdersFromServer : ');
      console.log(val);
      return val;
    });
    */

    /*
    const server = new Servers();
    if(server.getAllServerUrls() == true){
      setTimeout(() => {
        this.props.navigation.navigate('login');
      }, 2500);
    }else{
      alert("Le serveur Big Data Consulting n'est pas joignable...\n");
    }
    */
   const res = true;
   if(res == true){
      setTimeout(() => {
        this.props.navigation.navigate('dashboard');
        return;
      }, 2500);
    }else{
      alert("Le serveur Big Data Consulting n'est pas joignable...\n");
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

export default Download;

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