import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from  'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyFooter_v2 from '../footers/Footer_v2';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import Servers from '../../tasks/Servers';
  

class Loading_v2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadingNotify: 'loading...',
    };
  }
  
  componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.navigate('login');
    // }, 2500);

    setTimeout(() => {
      this.setState({
        ...this.state,
        loadingNotify: 'Téléchargement des commandes...'
    });
    }, 3000);

    setTimeout(() => {
      this.setState({
      ...this.state,
      loadingNotify: 'Téléchargement des produits...'
    });
    }, 6000);

    setTimeout(() => {
      this.setState({
        ...this.state,
        loadingNotify: 'Téléchargement des images produit...'
      });
      }, 9000);

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
  }

  render() {

    return (
        <LinearGradient
          start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
          colors={['#000', '#000']}
          style={styles.body}>

          <Image style={{width: 150, height: 150 }} source={require('../../../img/Loading.gif')}/>

          <Text style={styles.text}>{this.state.loadingNotify}</Text>

          <MyFooter_v2/>

        </LinearGradient>
    );
  }
}

export default Loading_v2;

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
    fontWeight: "bold"
  }
});