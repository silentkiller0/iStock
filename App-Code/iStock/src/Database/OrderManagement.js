//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'iStock.db' });

const TABLE_NAME = "orders";
const COLUMN_ID = "id"; //INTEGER PRIMARY KEY AUTOINCREMENT
const COLUMN_IS_SYNC = "is_sync"; //INT(2)
const COLUMN_IS_NEW = "isnew"; //INT(2)
const COLUMN_IS_SENT = "issent"; //INT(2)
const COLUMN_STATUT = "statut"; //statut INT(2)
const COLUMN_BILLED = "billed"; //INT(2)
const COLUMN_REF_CLIENT = "ref_client"; //INT(10)
const COLUMN_SOCID = "socId"; //INT(10)
const COLUMN_USER_AUTHOR_ID = "user_author_id"; //INT(10)
const COLUMN_MODE_REGLEMENT_ID = "mode_reglement_id"; //INT(10)
const COLUMN_REF_COMMANDE = "ref_commande"; //VARCHAR(255)
const COLUMN_DATE_CREATION = "date_creation"; //VARCHAR(255)
const COLUMN_DATE_COMMANDE = "date_commande"; //VARCHAR(255)
const COLUMN_DATE_LIVRAISON = "date_livraison"; //VARCHAR(255)
const COLUMN_MODE_REGLEMENT = "mode_reglement"; //VARCHAR(255)
const COLUMN_MODE_REGLEMENT_CODE = "mode_reglement_code"; //VARCHAR(255)
const COLUMN_ACOMPTE = "acompte"; //VARCHAR(255)
const COLUMN_NOTE_PUBLIC = "note_public"; //VARCHAR(255)
const COLUMN_NOTE_PRIVEE = "note_privee"; //VARCHAR(255)
const COLUMN_USER_VALID = "user_valid"; //VARCHAR(255)
const COLUMN_TOTAL_HT = "total_ht"; //VARCHAR(255)
const COLUMN_TOTAL_TVA = "total_tva"; //VARCHAR(50)
const COLUMN_TOTAL_TTC = "total_ttc"; //VARCHAR(255)
const COLUMN_BROUILLION = "brouillon";  //VARCHAR(255)
const COLUMN_REMISE_ABSOLUE = "remise_absolue"; //VARCHAR(255)
const COLUMN_REMISE_PERCENT = "remise_percent"; //VARCHAR(255)
const COLUMN_REMISE = "remise"; //VARCHAR(255)


const create = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + "(" +
    COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT," +
    COLUMN_IS_SYNC + " INT(2)," +
    COLUMN_IS_NEW + " INT(2)," +
    COLUMN_IS_SENT + " INT(2)," +
    COLUMN_STATUT + " INT(2)," +
    COLUMN_STATUT + " INT(2)," +
    COLUMN_BILLED + " INT(2)," +
    COLUMN_REF_CLIENT + " INT(10)," +
    COLUMN_SOCID + " INT(10)," +
    COLUMN_SOCID + " INT(10)," +
    COLUMN_USER_AUTHOR_ID + " INT(10)," +
    COLUMN_MODE_REGLEMENT_ID + " INT(10)," +
    COLUMN_REF_COMMANDE + " VARCHAR(255)," +
    COLUMN_DATE_CREATION + " VARCHAR(255)," +
    COLUMN_DATE_COMMANDE + " VARCHAR(255)," +
    COLUMN_DATE_LIVRAISON + " VARCHAR(255)," +
    COLUMN_MODE_REGLEMENT + " VARCHAR(255)," +
    COLUMN_MODE_REGLEMENT_CODE + " VARCHAR(255)," +
    COLUMN_ACOMPTE + " VARCHAR(255)," +
    COLUMN_NOTE_PUBLIC + " VARCHAR(255)," +
    COLUMN_NOTE_PRIVEE + " VARCHAR(255)," +
    COLUMN_USER_VALID + " VARCHAR(255)," +
    COLUMN_TOTAL_HT + " VARCHAR(255)," +
    COLUMN_TOTAL_TVA + " VARCHAR(255)," +
    COLUMN_TOTAL_TTC + " VARCHAR(255)," +
    COLUMN_BROUILLION + " VARCHAR(255)," +
    COLUMN_REMISE_ABSOLUE + " VARCHAR(255)," +
    COLUMN_REMISE_PERCENT + " VARCHAR(255)," +
    COLUMN_REMISE + " VARCHAR(255)," +
")";


// create a component
class OrderManagement extends Component {
    
    async CREATE_TABLE(){
        await db.transaction(async function (txn) {
            await txn.executeSql('DROP TABLE IF EXISTS ' + TABLE_NAME, []);
            await txn.executeSql(
                create,
                []
            );
            console.log("table '"+TABLE_NAME+"' Created/Existe ");
        });
    }

    async INSERT(data_){
        console.log("inserting.... ", data_.length);
        await db.transaction(async (tx) => {

            let insert = "INSERT INTO " + TABLE_NAME + " ("+COLUMN_ID+") VALUE (NULL)";
            for(let x = 0; x < data_.length; x++){
                await tx.executeSql(insert);
            }
        });
    }

    GET_BY_ID(id){
        console.log("##### GET_BY_ID #########################");

        return await new Promise(async (resolve) => {
            try{
                await db.transaction(async (tx) => {
                    await tx.executeSql("SELECT * FROM " + TABLE_NAME + " WHERE " + COLUMN_ID + " = " + id, [], async (tx, results) => {
                        var temp = {};
                        temp = results.rows.item(i);
                        return resolve(temp);                           
                    });
                });
            } catch(error){
                return resolve({});
            }
        });
    }
}

//make this component available to the app
export default OrderManager;
