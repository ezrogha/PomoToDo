import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default ({ data: { title, isChecked, id, isRunning }, toggleCheckbox, segue, deleteTodo, startTask = {}, xTodoValue }) => {
    return (
    <TouchableOpacity activeOpacity={0.9} onPress={segue}>
        <Animated.View style={[styles.todoContainer, { left: xTodoValue }]}>
            <View style={{ flexDirection: "row", }}>
                <MaterialCommunityIcons onPress={toggleCheckbox.bind(this, { id, isChecked: !isChecked })} name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"} color="green" size={32} />
                <View style={styles.todoTextContainer}>
                    <Text style={styles.todoText}>{title}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                {!isChecked && (isRunning ? <Ionicons name="ios-timer" color="green" size={25} /> :<Ionicons onPress={startTask.bind(this, {title, id})} name="md-play" color="green" size={25} />)}
                <View style={{ width: 20 }} />
                <MaterialCommunityIcons onPress={deleteTodo.bind(this, {id, title})} name="trash-can-outline" color="red" size={25} />
            </View>
        </Animated.View>
    </TouchableOpacity>
)}

const styles = StyleSheet.create({
    todoContainer: {
        justifyContent: 'space-between',
        flexDirection: "row",
        width: width - 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignSelf: 'center',
        marginBottom: 20
    },
    todoText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'grey'
    },
    todoTextContainer: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingTop: 4
    }
})