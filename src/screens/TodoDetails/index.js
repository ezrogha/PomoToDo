import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { addTodo } from '../../store/actions/todoActions';

class TodoDetails extends Component {

    state = {
        isChecked: false,
        title: '',
        detail: ''
    }

    onSaveTodo = () => {
        if (this.state.title === '') {
            Alert.alert(
                'Add a title',
                'Please fill out what you intend to accomplish.',
                [
                    { text: 'OK'},
                ],
                { cancelable: true }
            );
            return false
        }
        this.props.addTodo(this.state)
        this.props.navigation.navigate('Todo')
    }

    onChangeTitle = (title) => {
        this.setState({ title })
    }

    onChangeDetail = (detail) => {
        this.setState({ detail })
    }

    render() {
        console.log(this.props)
        return (
            <View style={{
                margin: 20
            }}>
                <View>
                    <Text style={styles.textFieldLabel}>Title: </Text>
                    <TextInput value={this.state.title} onChangeText={this.onChangeTitle} style={styles.textInputStyle} />
                </View>
                <View>
                    <Text style={styles.textFieldLabel}>Detail: </Text>
                    <TextInput value={this.state.detail} onChangeText={this.onChangeDetail} style={[styles.textInputStyle, { height: 100 }]}
                        multiline={true} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.onSaveTodo} style={styles.saveButton}>
                        <Text style={{ color: 'white' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {}
  }

export default connect(mapStateToProps, {
    addTodo
})(TodoDetails)


const styles = StyleSheet.create({
    textFieldLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'grey'
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    },
    saveButton: {
        paddingHorizontal: 80,
        paddingVertical: 13,
        backgroundColor: '#007BBB',
        borderRadius: 5
    }
})
