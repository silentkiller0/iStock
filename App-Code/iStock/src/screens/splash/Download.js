import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, StatusBar, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyFooter from '../footers/Footer';
import FindCommandes from '../../services/FindCommandes';
import TokenManager from '../../Database/TokenManager';
const BG = require('../../../img/waiting_bg.png');


class Download extends Component {

  constructor(props) {
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

    if (token == null) {
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
    if (res == true) {
      setTimeout(() => {
        this.props.navigation.navigate('dashboard');
        return;
      }, 2500);
    } else {
      alert("Le serveur Big Data Consulting n'est pas joignable...\n");
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image source={BG} style={styles.backdrop} />
        </View>
        <Image style={styles.logo} source={require('../../../img/Loading.gif')} />
        <Text style={styles.text}>{this.state.loadingNotify}</Text>
      </View>
    );
  }
}

export default Download;

const styles = StyleSheet.create({

  backgroundContainer: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'

  },
  logo: {
    marginTop: 150,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    width: 450,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 20,
    color: "#4A4AD4",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80
  }
});