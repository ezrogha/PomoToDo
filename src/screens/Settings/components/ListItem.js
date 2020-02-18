import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default ({ title, value }) => (
    <TouchableOpacity style={styles.listItem}>
        <View>
            <Text style={styles.listItemText}>{title}</Text>
        </View>
        <View>
            <Text style={styles.listItemText}>{value}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    listItem: {
        height: 50,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.4
    },
    listItemText: {
        fontSize: 16,
        color: "rgb(100, 100, 100)"
    },
})
