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
          'CREATE TABLE IF NOT EXISTS commandes(id INTEGER PRIMARY KEY AUTOINCREMENT, ref_client INT(10),ref_commande VARCHAR(255),date_creation VARCHAR(255),date_livraison VARCHAR(255),mode_reglement VARCHAR(255),acompte VARCHAR(255),remise_commande VARCHAR(255),note_privee VARCHAR(255),total_ht VARCHAR(255),total_ttc VARCHAR(255),total_tva VARCHAR(50), statut INT(2),billed INT(2),isnew INT(2), issent INT(2))',
          []
      );
      console.log("table 'commandes' Created/Existe ");

      //##### Ligne CMD #####################################################################
      await txn.executeSql('DROP TABLE IF EXISTS commandes_produits', []);
      await txn.executeSql(
          'CREATE TABLE IF NOT EXISTS commandes_produits(id INTEGER PRIMARY KEY AUTOINCREMENT, label VARCHAR(255), ref_produit VARCHAR(100), qt INT(10),price VARCHAR(100),price_ttc VARCHAR(100),tva VARCHAR(100),type_commande VARCHAR(2),remise_produit VARCHAR(20), id_commandes_client INT(10),pvu VARCHAR(20))',
          []
      );
      console.log("table 'commandes_produits' Created/Existe ");

    });
  }

  async getAllCommandesFromServer(token){
    this.checkTable();

    //const token = await AsyncStorage.getItem('token');
    console.log('FindCommandes', 'getAllCommandesFromServer()');
    console.log('token', token);

    let i_ = 0;
    let ind = 0;

    return await new Promise(async (resolve)=> {
      while(i_ < 10){
        await axios.get(`${token.server}/api/index.php/orders?sortfield=t.rowid&sortorder=ASC&limit=50&page=${i_}`, 
            { headers: { 'DOLAPIKEY': token.token, 'Accept': 'application/json' } })
        .then(async (response) => {
            if(response.status == 200){
                console.log('Status == 200');
                console.log(response.data);


                i_++;
            }else{
                console.log('Status != 200');
                console.log(response.data);
            }

        }).catch(async (error) => {
            // handle error
            console.log('error : ', error);
            if (error.response.status === 404) {
              ind += 1;
              if (ind === 1) {
                  i_ = 11;
                  console.log('Le telechargement des commandes est finis');
                  await resolve(true);
              }
              await resolve(false);
            }
            await resolve(false);
        });
      }
    });
  }

  async saveInDatabase(orderList){
    for(let index = 0; index<orderList.length; index++){
      await txn.executeSql(
        "INSERT INTO commandes('id', 'name', 'country', 'code_pays', 'town', 'zip', 'address', 'phone', 'fax', 'email', 'skype', 'url', 'idprof1', 'idprof2', 'idprof3','idprof4', 'note', 'code_client', 'code_fournisseur', 'ref') "+
        "VALUE()",
        []
      );
    }
  }

  render() {
    return (
      <View>
        <Text> FindCommandes </Text>
      </View>
    );
  }
}
