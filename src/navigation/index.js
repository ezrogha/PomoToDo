import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons';

import StatsScreen from '../screens/Stats';
import SettingsScreen from '../screens/Settings';
import TimerScreen from '../screens/Timer';
import TodoScreen from '../screens/Todo';
import TodoDetailsScreen from '../screens/TodoDetails'
import TodoInfoScreen from '../screens/TodoInfo';
import AlarmsScreen from '../screens/Alarms'

import { headerNavigationOptions } from '../utils/helpers';

const TodoNavigator = createStackNavigator({
    Todo: {
        screen: TodoScreen
    },
    TodoDetails: {
        screen: TodoDetailsScreen,
    },
    TodoInfo: {
        screen: TodoInfoScreen,
        navigationOptions: () => headerNavigationOptions('Todo Details')
    }
})

const SettingNavigator = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: () => headerNavigationOptions('Settings')
    },
    Alarms: {
        screen: AlarmsScreen,
    }
})

const StatsNavigator = createStackNavigator({
    Stats: {
        screen: StatsScreen,
        navigationOptions: () => headerNavigationOptions('Stats')
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
        screen: StatsNavigator
    },
    Settings: {
        screen: SettingNavigator
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