import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'iStockDatabase.db' });

export default class FindCommandes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commandes: []
    };
  }

  async checkTable(){
    // creation
    await db.transaction(async function (txn) {
      await txn.executeSql('DROP TABLE IF EXISTS commandes', []);
      await txn.executeSql(
          'CREATE TABLE IF NOT EXISTS commandes(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), country VARCHAR(100),code_pays VARCHAR(100), town VARCHAR(100), zip VARCHAR(100), address VARCHAR(100), phone VARCHAR(100), fax VARCHAR(100), email VARCHAR(100), skype VARCHAR(100), url VARCHAR(100), idprof1 VARCHAR(100), idprof2 VARCHAR(100), idprof3 VARCHAR(100), idprof4 VARCHAR(100), note VARCHAR(255), code_client VARCHAR(100), code_fournisseur VARCHAR(100),ref VARCHAR(100))',
          []
      );
      console.log('table created');
    });
  }

  async getAllCommandesFromServer(token){
    //const token = await AsyncStorage.getItem('token');
    console.log('FindCommandes', 'getAllCommandesFromServer()');
    console.log('token', token);

    return await axios.get(`${token.server}/api/index.php/orders?sortfield=t.rowid&sortorder=ASC&limit=100`, 
            { headers: { 'DOLAPIKEY': token.token, 'Accept': 'application/json' } })
        .then(async (response) => {
            if(response.status == 200){
                console.log('Status == 200');
                console.log(response.data);

                return true;
            }else{
                console.log('Status != 200');
                console.log(response.data);
                return false;
            }
        }).catch(async (error) => {
            // handle error
            console.log('error 1 : ');
            console.log(error);
            console.log(error.response.request._response);
            return false;
        });
  }

  render() {
    return (
      <View>
        <Text> FindCommandes </Text>
      </View>
    );
  }
}
