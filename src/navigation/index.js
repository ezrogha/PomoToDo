import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons';

import StatsScreen from '../screens/Stats';
import SettingsScreen from '../screens/Settings';
import TimerScreen from '../screens/Timer';
import TodoScreen from '../screens/Todo';
import TodoDetailsScreen from '../screens/TodoDetails'

const TodoNavigator = createStackNavigator({
    Todo: {
        screen: TodoScreen
    },
    TodoDetails: {
        screen: TodoDetailsScreen,
        navigationOptions: {
            headerTitle: 'Todo Details',
            headerStyle: {
                backgroundColor: '#009DDD'
            },
            headerTintColor: '#fff'
        }
    }
})

const routeConfigs = {
    Todo: {
        screen: TodoNavigator
    },
    Timer: {
        screen: TimerScreen
    },
    Stats: {
        screen: StatsScreen
    },
    Settings: {
        screen: SettingsScreen
    }
}

const tabNavConfigs = {
    tabBarOptions: {
        activeTintColor: "#007BBB",
        style: {
            paddingTop: 2,
        }
    },
    defaultNavigationOptions: ({ navigation }) => ({
        // Addong tabbar icons and changing color on focus 
        tabBarIcon: ({ focused, tintColor }) => {
            let { state: { routeName } } = navigation
            let iconName;
            tintColor = focused ? "#007BBB" : "lightgrey"
            switch (routeName) {
                case "Todo":
                    iconName = "ios-list"
                    break;
                case "Timer":
                    iconName = "ios-timer"
                    break;
                case "Settings":
                    iconName = "ios-cog"
                    break;
                case "Stats":
                    iconName = "ios-stats"
                    break;

                default:
                    break;
            }
            return <Ionicons name={iconName} color={tintColor} size={32} />
        }
    })
}

const TabNavigator = createBottomTabNavigator(routeConfigs, tabNavConfigs);

export default createAppContainer(TabNavigator);