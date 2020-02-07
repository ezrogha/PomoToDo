import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AddButton from './components/AddButton';
import ToggleTodoButton from './components/ToggleTodoButton';
import TodoItem from './components/TodoItem';
import { toggleTodo } from '../../store/actions/todoActions';

class Todo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: { params = {} }, navigate } = navigation
        return {
            headerStyle: {
                backgroundColor: "#009DDD"
            },
            headerLeft: () => <AddButton navigate={navigate} />,
            headerTitle: () => <ToggleTodoButton
                todoTabState={params.todoButtonState}
                doneTabState={params.doneButtonState}
                changeTab={params.changeTab}
            />,
        }
    }

    state = {
        todoTabState: true,
        doneTabState: false,
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

    toggleCheckbox = (id, isChecked) => {
        this.props.toggleTodo(id, isChecked)
    }

    segue = (data) => {
        this.props.navigation.navigate('TodoInfo', data)
    }

    renderTodoList = () => {
        return this.props.todos.map((data, index) => {
            if (this.state.todoTabState && !data.isChecked) {
                return (
                    <TodoItem key={index} data={data} toggleCheckbox={this.toggleCheckbox} segue={() => this.segue(data)} />
                )
            } else if(!this.state.todoTabState && data.isChecked){
                return (
                    <TodoItem key={index} data={data} toggleCheckbox={this.toggleCheckbox} segue={() => this.segue(data)} />
                )
            }
        })
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    marginVertical: 10
                }}
            >
                <ScrollView>
                    {this.renderTodoList()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos
})

export default connect(mapStateToProps, {
    toggleTodo
})(Todo)
