//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'iStock.db' });
import Servers from './models/Servers';
var servers = new Servers();

let CREATE_TABLES;

// create a component
class Database extends Component {
    constructor(props){
        super(props);
        CREATE_TABLES = [
            servers.CREATE_SERVER_TABLE()
        ]
        
    }

    async initDB() {
        console.log("Opening database ...");
        await db.transaction(async (tx) => {

            for(let x = 0; x < CREATE_TABLES.length; x++){
                await tx.executeSql(CREATE_TABLES[x]);
                console.log("Table created : ", (x+1));
            }
        });
    };

    async closeDatabase() {
        if (db) {
            console.log("closeDatabase");
            db.close();
        } else {
          console.log("Database was not OPENED");
        }
    };

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Database;
