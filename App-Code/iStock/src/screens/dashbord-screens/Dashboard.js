import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Animated
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import MainButton from '../dashbord-screens/assets/MainButton';


export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {

    return (
      <LinearGradient
        start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1}}
        colors={['#00AAFF', '#706FD3']}
        style={styles.container}>

        <NavbarDashboard navigation={ this.props }/>
        <View style={styles.mainBody}>

          {/* Main twist button */}
          <MainButton/>
          {/* END Main twist button */}

          <Text>
              Dashboard !
          </Text>
          <Text>
              Dashboard !
          </Text>
          <Text>
              Dashboard !
          </Text>
        </View>
        <MyFooter/>
      </LinearGradient>
    );
  }
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
    height: '60%',
    width: '100%',
    position: "absolute",
    bottom: 60,
  }
});

