import React, { Component } from 'react';
import { SwitchNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Commande from '../screens/Commande';
import Preparation from '../screens/Preparation';
import Inventory from '../screens/Inventory';


// when user is logged out
class LoginNavigation extends Component {
  render() {
    const Navigation = createAppContainer(createDrawerNavigator(
      {
        dashboard: Dashboard,
        commande: Commande,
        preparation: Preparation,
        inventory: Inventory
      },
      {
        initialRouteName: 'dashboard',
      }
    ));

    return (
      <Navigation />
    );
  }
}
export default LoginNavigation;
