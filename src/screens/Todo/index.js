import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import AddButton from './components/AddButton';
import ToggleTodoButton from './components/ToggleTodoButton'

export default class Todo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: { params = {} } } = navigation
        return {
            headerStyle: {
                backgroundColor: "#009DDD"
            },
            headerLeft: () => <AddButton />,
            headerTitle: () => <ToggleTodoButton
                                    todoTabState={params.todoButtonState}
                                    doneTabState={params.doneButtonState}
                                    changeTab={params.changeTab} 
                                    />,
        }
    }

    state = {
        todoTabState: true,
        doneTabState: false
    }

    componentDidMount() {
        // Pass state to navigationOptions
        this.props.navigation.setParams({
            changeTab: this.changeTab,
            todoButtonState: true,
            doneButtonState: false,
        })
    }

    changeTab = (val) => {
        // 0 is for ToDo
        // 1 is for Done
        const boolVal = val === 0 ? true : false
        this.setState({
            todoTabState: boolVal,
            doneTabState: !boolVal
        }, () => {
            this.props.navigation.setParams({
                changeTab: this.changeTab,
                todoButtonState: this.state.todoTabState,
                doneButtonState: !this.state.todoTabState
            })
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text> Todo </Text>
                </View>
            </SafeAreaView>
        )
    }
}
