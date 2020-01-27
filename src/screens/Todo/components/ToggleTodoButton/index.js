import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default ({ todoTabState, doneTabState, changeTab }) => {
    console.log(`Todo: ${todoTabState}, Done: ${doneTabState}`)
    return (
    <View style={styles.view}>
        <TouchableOpacity activeOpacity={1} onPress={() => changeTab(0)} style={[ styles.button, todoTabState && styles.active ]}>
            <Text style={[ styles.text, todoTabState &&  styles.activeText ]}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => changeTab(1)} style={[ styles.button, doneTabState && styles.active ]}>
            <Text style={[ styles.text, doneTabState &&  styles.activeText ]}>Done</Text>
        </TouchableOpacity>
    </View>
)}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 2
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    active: {
        backgroundColor: "white"
    },
    activeText: {
        color: "#009DDD"
    },
    default: {
        backgroundColor: "#009DDD"
    },
    defaultText: {
        color: "white"
    },
    text: {
        color: "white"
    }
})