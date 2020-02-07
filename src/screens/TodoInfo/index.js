import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux';

import { toggleTodo } from '../../store/actions/todoActions';

class TodoInfo extends Component {

    state = {

    }

    componentDidMount() {
        const { state: { params = {} } } = this.props.navigation
        this.setState(params)
    }

    componentDidUpdate() {
        const updatedItem = this.props.todos.filter(item => item.id === this.state.id)[0]
        if (updatedItem.isChecked !== this.state.isChecked) {
            this.setState({ isChecked: updatedItem.isChecked })
        }
    }

    toggleCheckbox = (id, isChecked) => {
        this.props.toggleTodo(id, isChecked)
    }

    render() {
        const { isChecked, id } = this.state
        const todoItem = this.props.todos.filter(item => item.id === id)[0]
        return (
            <ScrollView style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.headerText}>Header Text</Text>
                            <Text style={styles.dateText}>20 Aug 2020, 08:00 PM</Text>
                        </View>
                        <MaterialCommunityIcons onPress={() => this.props.navigation.navigate('TodoDetails', { editRequest: true, todoItem })} name={'square-edit-outline'} color="green" size={22} />
                    </View>
                    <View>
                        <MaterialCommunityIcons onPress={() => this.toggleCheckbox(id, !isChecked)} name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"} color="green" size={38} />
                    </View>
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.detailsText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis </Text>
                </View>
                <TouchableOpacity  disabled={isChecked} style={[styles.startButton, { backgroundColor: isChecked ? '#A8D8FF' : '#007BBB', }]}>
                    <Text style={{ color: 'white' }}>Start</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos
})

export default connect(mapStateToProps, {
    toggleTodo
})(TodoInfo)

const styles = StyleSheet.create({
    infoContainer: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    headerContainer: {

    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22,
        color: 'black'
    },
    dateHeader: {
        marginVertical: 10
    },
    dateText: {
        fontSize: 12,
        color: 'grey'
    },
    detailsView: {
        marginTop: 20,
        marginBottom: 40
    },
    detailsText: {
        fontSize: 20,
        textAlign: "justify"
    },
    startButton: {
        paddingHorizontal: 80,
        paddingVertical: 13,
        backgroundColor: '#007BBB',
        borderRadius: 5,
        alignSelf: 'center'
    }
})
