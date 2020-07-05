//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'iStock.db' });

const SERVER_TABLE_NAME = "server";
const SERVER_COLUMN_ROWID = "rowid";
const SERVER_COLUMN_NAME = "name";
const SERVER_COLUMN_URL = "url";


// create a component
class Servers extends Component {

    CREATE_SERVER_TABLE(){
        return "CREATE TABLE IF NOT EXISTS " + SERVER_TABLE_NAME + " {"+SERVER_COLUMN_ROWID+" integer AUTO_INCREMENT PRIMARY KEY NOT NULL, "+SERVER_COLUMN_NAME+" varchar(255) NOT NULL, "+SERVER_COLUMN_URL+" varchar(255) NOT NULL}";
    }

    async INSERT_SERVER(data_){
        console.log("inserting.... ", data_.length);
        await db.transaction(async (tx) => {

            for(let x = 0; x < data_.length; x++){
                await tx.executeSql("INSERT INTO " + SERVER_TABLE_NAME + " ("+SERVER_COLUMN_ROWID+", "+SERVER_COLUMN_NAME+", "+SERVER_COLUMN_URL+") VALUE (NULL, "+data_[x].name+", "+data_[x].url+")");
            }
        });
    }

    GET_SERVER_BY_ID(rowid){
        return "SELECT * FROM " + SERVER_TABLE_NAME + " WHERE " + SERVER_COLUMN_ROWID + " = " + rowid;
    }

    async GET_SERVER_LIST(db_){
        console.log("GET_SERVER_LIST : ");

        return await new Promise(async (resolve) => {
            const servers = [];

            await db_.transaction(async (tx) => {
                await tx.executeSql("SELECT * FROM " + SERVER_TABLE_NAME, []).then(async ([tx, result]) => {
                    console.log('Query completed');
    
                    let size = result.rows.length;
                    for(let x = 0; x < size; x++){
                        let row = result.rows.item(x);
                        console.log(`ID : ${row.rowid}, Name : ${row.name}, Url : ${row.url}`);
    
                        const { rowid, name, url } = row;
                        servers.push({
                            rowid,
                            name,
                            url
                        });
                    }
                    console.log('servers : ', servers);
                    resolve(servers);
                });
            }).then(async (result) => {
                console.error('result : ', result);
            });
        });

    }

    UPDATE_SERVER_BY_ID(data_){
        return "UPDATE " + SERVER_TABLE_NAME + " SET " + SERVER_COLUMN_NAME + " = "+data_.name+", "+SERVER_COLUMN_URL+" = "+data_.url+" WHERE " + SERVER_COLUMN_ROWID + " = " + data_.rowid;
    }

    async DELETE_SERVER_LIST(){
        console.log("DELETE_SERVER_LIST : ");
        await db.transaction(async (tx) => {
            await tx.executeSql("DELETE FROM " + SERVER_TABLE_NAME);
        });
    }

}

//make this component available to the app
export default Servers;
