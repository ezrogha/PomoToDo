import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default ({ data: { title, isChecked, id }, toggleCheckbox, segue}) => (
    <TouchableOpacity activeOpacity={0.9} onPress={segue}>
        <View style={styles.todoContainer}>
            <View style={{ flexDirection: "row", }}>
                <MaterialCommunityIcons onPress={() => toggleCheckbox(id, !isChecked)} name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"} color="green" size={32} />
                <View style={styles.todoTextContainer}>
                    <Text style={styles.todoText}>{title}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="ios-arrow-up" color="green" size={25} />
                <View style={{ width: 10 }} />
                <Ionicons name="ios-arrow-down" color="green" size={25} />
            </View>
        </View>
    </TouchableOpacity>
)

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