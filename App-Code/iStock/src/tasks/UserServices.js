//import liraries
import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Platform, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Database from '../Database/Database';
import Servers from '../Database/models/Servers';

// create a component
class UserServices extends Component {
    constructor(props){
        super(props);
    }

    async LogginIn(account, props){
        this.props = props;
        console.log('LogginIn');
        console.log(account);

        //find the selected company
        const servers_ = await AsyncStorage.getItem('server_list');
        console.log('server_list : ', servers_);

        const server = JSON.parse(servers_);
        for(let i = 0; i < server.length; i++){
            if(account.entreprise == server[i].name){
                account.serverUrl = server[i].url;
                break;
            }
        }

        // console.log('end: ', account);

        //login
        const result = await new Promise(async (resolve) => {
            await axios.post(`${account.serverUrl}/api/index.php/login`, 
            {
                login: account.identifiant,
                password: account.password
            }, 
            { headers: { 'Accept': 'application/json' } })
        .then(async (response) => {
            if(response.status == 200){
                console.log('Status == 200');
                // console.log(response.data);
                account.key = response.data.success.token;
                
                await axios.post(`${account.serverUrl}/api/index.php/istockapi/login`, 
                    {
                        login: account.identifiant,
                        password: account.password
                    }, 
                    { headers: { 'DOLAPIKEY': account.key, 'Accept': 'application/json' } })
                .then(async (response) => {
                    if(response.status == 200){
                        console.log('Status == 200');
                        console.log(response.data);

                        //navigate to connexion dashbord
                        await resolve(true);
                    }else{
                        console.log('Status != 200');
                        console.log(response.data);
                    }
                }).catch(async (error) => {
                    // handle error
                    console.log('error 1 : ');
                    console.log(error);
                    console.log( error.response.request._response);
                });
                
            }else{
                console.log('Status != 200');
                console.log(response.data);
            }
        }).catch(async (error) => {
            // handle error
            console.log('error 1 : ');
            console.log(error);
            console.log( error.response.request._response);
        });
        });

        if(result){
            this.props.navigation.navigate('dashboard');
        }
        
    }

    SigningIn(account){

        let isUser = false;
        console.log('SigningIn');
        console.log(account);

        //check if the user have an account in dolibar first
        /*
        {
            method: 'POST',
            url: `${account.server}/api/index.php/istockapi/login?login=${account.identifiant}&password=${account.password}`,
            headers: { 'DOLAPIKEY': account.key, 'Accept': 'application/json' }
        }
        */

        axios.post(`${account.server}/api/index.php/istockapi/login`,
                    {
                        login: account.identifiant,
                        password: account.password
                    },
                    { headers: { 'DOLAPIKEY': account.key, 'Accept': 'application/json' } })
                .then(function (response) {

                    if(response.status){

                        let deviceOS = "";
                        if (Platform.OS === 'android') {
                            deviceOS = "Android";
                        }
                        if (Platform.OS === 'ios') {
                            deviceOS = "IOS";
                        }

                        console.log('user_data :');
                        const user_data = {
                            rowid: "NULL",
                            date_creation: Math.floor(Date.now() / 1000),
                            identifiant: account.identifiant,
                            last_connexion: Math.floor(Date.now() / 1000),
                            device_platform: deviceOS,
                            device_type: (DeviceInfo.isTablet() ? "Tablette" : "Téléphone"),
                            fk_user: parseInt("" + response.data.success.id)
                        };
                        console.log(user_data);

                        axios.post(`${account.server}/api/index.php/istockapi/authentifications/create`, 
                                    user_data, 
                                    { headers: { 'DOLAPIKEY': account.key, 'Accept': 'application/json' } })
                                .then(function (response) {
                                    if(response.status == 200){
                                        console.log('Status == 200');
                                        console.log(response.data);

                                        //navigate to connexion screen
                                        this.props.navigation.navigate('login')
                                    }else{
                                        console.log('Status != 200');
                                        console.log(response.data);
                                    }
                                }).catch(function (error) {
                                    // handle error
                                    console.log('error 2 : ');
                                    console.log(error);
                                    console.log( error.response.request._response);
                                });
                    }
                })
                .catch(function (error) {
                    // handle error
                    isUser = false;
                    console.log('error 1 : ');
                    console.log( error);
                    console.log( error.response.request._response);
                    alert("Vous n'avez pas de compte sur " + account.server);
                });
    }

}


//make this component available to the app
export default UserServices;
