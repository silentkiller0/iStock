import React from 'react';
import { 
    View, 
    Text,
    Button, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ScrollView,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import Users from '../models/Users';
import Animated from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';

{/* <Button title="Login" onPress={() => this.props.navigation.navigate('dashboard')}/>*/}


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true
    };
  }

  render() {

    const textInputChanged = (val) => {
      if(val.length > 0){
        
        this.setState({
          ...this.state,
          email: val,
          check_textInputChange: true
        });
        
      }else{
        this.setState({
          ...this.state,
          email: val,
          check_textInputChange: false
        });
      }
    }

    const handlePasswordChange = (val) =>{
      this.setState({
        ...this.state,
        password: val
      });
    };

    const updateSecureTextEntry = () =>{
      this.setState({
        ...this.state,
        secureTextEntry: !this.state.secureTextEntry
      });
    };

    return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#00AAFF" barStyle="light-content"/>
            <View style={styles.header}>
              <Text style={[styles.text_header]}>Bienvenue!</Text>
            </View>
            <Animatable.View 
              animation="fadeInUpBig"
              style={styles.footer}>

              <ScrollView>
              <Text style={styles.text_footer}>Email</Text>

              <View style={styles.action}>
                <FontAwesome 
                  name="user-o" 
                  color="#05375a" 
                  size={20}  />
                <TextInput 
                  placeholder="Votre Email..." 
                  style={styles.textInput} 
                  autoCapitalize="none" 
                  onChangeText={(val) => textInputChanged(val)}/>

                {this.state.check_textInputChange ? 
                <Animatable.View animation="bounceIn">
                  <Feather 
                    name="check-circle" 
                    color="#00AAFF" 
                    size={20}  />
                </Animatable.View>
                : 
                null} 
              </View>

              <Text 
                style={[styles.text_footer, {marginTop: 40}]}>Mot de passe</Text>
              <View style={styles.action}>
                <FontAwesome 
                  name="lock" 
                  color="#05375a" 
                  size={20}/>
                <TextInput 
                  placeholder="Votre mot de passe..." 
                  style={styles.textInput} 
                  autoCapitalize="none" 
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                  onChangeText={(val) => handlePasswordChange(val)}/>

                <TouchableOpacity
                  onPress={updateSecureTextEntry}>

                  {this.state.secureTextEntry ? 
                  <Feather 
                    name="eye-off" 
                    color="grey" 
                    size={20}/>
                  : 
                  <Feather 
                    name="eye" 
                    color="grey" 
                    size={20}/>
                  }
                  
                </TouchableOpacity>
                
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => this.props.navigation.navigate('dashboard')}
                >
                  <LinearGradient
                    colors={['#00AAFF', '#00CCFF']}
                    style={styles.signIn}
                  >
                    <Text style={[styles.textSign, {color: '#FFF'}]}>Connexion</Text>
                  </LinearGradient>
                </TouchableOpacity>
                  

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('signIn')} 
                  style={[styles.signIn, {
                    borderColor: "#009387",
                    borderWidth: 1,
                    marginTop: 15
                  }]}>
                  <Text style={[styles.textSign, {color: '#000'}]}>Se Connecter</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
              
            </Animatable.View>
        </View>
    );
  }
}
export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00AAFF'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#ABCDEF',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : 12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});