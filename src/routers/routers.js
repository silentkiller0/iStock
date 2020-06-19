import React, { Component } from 'react';
import { SwitchNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Welcome from '../screens/Welcome';
import Loading from '../screens/splash/Loading';
import Login from '../screens/login';
import Dashboard from '../screens/Dashboard';

import Commande from '../screens/Commande';
import Preparation from '../screens/Preparation';
import Inventory from '../screens/Inventory';
import Settings from '../screens/Settings';


class RouterNavigation extends Component {
    render() {

      // when user is logged in
      const Drawer = createDrawerNavigator();
      function DrawerNavigation(){
        return (
          <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Commande" component={Commande} />
            <Drawer.Screen name="Preparation" component={Preparation} />
            <Drawer.Screen name="Inventory" component={Inventory} />
            <Drawer.Screen name="Configuration" component={Settings} />
          </Drawer.Navigator>
        );
      }

      // when user is logged out
      const Navigation = createAppContainer(createSwitchNavigator(
        {
          welcome: Welcome,
          loading: Loading,
          login: Login,
          dashboard: DrawerNavigation
        },
        {
          initialRouteName: 'welcome',
        }
      ));
      return (
        <Navigation />
      );
    }
}
export default RouterNavigation;
