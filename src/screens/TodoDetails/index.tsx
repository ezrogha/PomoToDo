import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { addTodo, editTodo } from '../../store/actions/todoActions';
import { headerNavigationOptions } from '../../utils/helpers'

interface Props {
    navigation: {
        state: {
            params: {
                editRequest: () => void,
                todoItem: () => void
            }
        },
        navigate: (val: string) => void
    },
    editTodo: () => void,
    addTodo: () => void
}

interface State {
    isChecked: boolean,
    title: string,
    detail: string,
    isRunning: boolean
}

class TodoDetails extends Component<Props, State> {

    state = {
        isChecked: false,
        title: '',
        detail: '',
        isRunning: false
    }

    static navigationOptions = ({ navigation }) => {
        const { state: { params = {} } } = navigation
        return headerNavigationOptions(params.editRequest ? 'Edit Todo' : 'Create Todo')
    }

    componentDidMount() {
        const { state: { params = {} } } = this.props.navigation
        if (params.editRequest) {
            const { todoItem } = params
            this.setState(todoItem)
        }
    }

    onSaveTodo = () => {
        if (this.state.title === '') {
            Alert.alert(
                'Add a title',
                'Please fill out what you intend to accomplish.',
                [
                    { text: 'OK' },
                ],
                { cancelable: true }
            );
            return false
        }
        const { state: { params = {} } } = this.props.navigation
        if (params.editRequest) {
            // If we are editing the todo item
            const { id, title, detail } = this.state;
            this.props.editTodo({ id, title, detail })
        } else {
            this.props.addTodo(this.state)
        }
        this.props.navigation.navigate('Todo')
    }

    onChangeTitle = (title: string) => {
        this.setState({ title })
    }

    onChangeDetail = (detail: string) => {
        this.setState({ detail })
    }

    render() {
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
    addTodo,
    editTodo
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
