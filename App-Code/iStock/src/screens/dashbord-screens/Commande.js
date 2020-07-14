import React, { Component } from 'react';
import {StyleSheet, View, Text, Dimensions} from  'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import NavbarDashboard from '../../navbar/navbar-dashboard';
import MyFooter from '../footers/Footer';
import OrderButton from '../dashbord-screens/assets/OrderButton';
import { List, ListItem } from 'react-native-elements'



class Commande extends Component {
  constructor(props){
    super(props);

    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    /**
    * Returns true of the screen is in landscape mode
    */
    const isLandscape = () => {
      const dim = Dimensions.get('screen');
      return dim.width >= dim.height;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };
    
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  }




  render() {
    const test_cmd_list = [
      {id: 1, name: "Test Panier 1", prixTTC: 154, user: "JL", ref: "PROV-00000001"},
      {id: 2, name: "Test Panier 2", prixTTC: 241, user: "Amine", ref: "PROV-00000003"},
      {id: 3, name: "Test Panier 3", prixTTC: 114, user: "Ilias", ref: "PROV-00009142"},
      {id: 4, name: "Test Panier 4", prixTTC: 325, user: "Fahd", ref: "PROV-09999999"},
      {id: 5, name: "Test Panier 5", prixTTC: 999, user: "Admin", ref: "PROV-12345678"}
    ];

    if (this.state.orientation === 'portrait') {
      console.log('orientation : ', this.state.orientation);
    }
    else {
      console.log('orientation : ', this.state.orientation);
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      mainBody: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        height: this.state.orientation === 'portrait' ? '80%' : '60%',
        width: '100%',
        position: "absolute",
        bottom: 110,
      },
      listItemBody: {
        width: '100%', 
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#010101',
        shadowColor: '#00FF00',
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        padding: 10,
        marginBottom: 20
      },
      listItemBody_layout: {
        //flex: 1,
        flexDirection: "row",
      }
    });


    return (
      <LinearGradient
        start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
        colors={['#00AAFF', '#706FD3']}
        style={styles.container}>

        <NavbarDashboard navigation={ this.props }/>
        <View style={styles.mainBody}>

        {
          test_cmd_list.map((item) => (
            <View style={styles.listItemBody}>
              <View style={styles.listItemBody_layout}>
                <Text style={{flex: 1, height: 70, fontStyle: 'bold', fontSize: 20}}>{item.name}</Text>
                <Text>{item.prixTTC} TTC</Text>
              </View>
              <View style={styles.listItemBody_layout}>
                <Text style={{flex: 1,}}>{item.user}</Text>
                <Text style={{fontSize: 20}}>{item.ref}</Text>
              </View>
            </View>
          ))
        }

        
          

        </View>
        <MyFooter/>
        {/* Main twist button */}
        <OrderButton navigation={this.props.navigation}/>
        {/* END Main twist button */}
      </LinearGradient>
    );
  }
}



export default Commande;