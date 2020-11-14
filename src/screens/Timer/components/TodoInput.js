import React from 'react'
import { StyleSheet, View, TextInput, Dimensions, Platform } from 'react-native'

const { height, width } = Dimensions.get('window');

export default ({ text, onChange }) => (
    <View style={styles.textContainter}>
        <TextInput style={styles.textInput} placeholder="Enter Task name..." value={text} onChangeText={onChange} />
    </View>
)

const styles = StyleSheet.create({
    textContainter: {
        top: Platform.OS === "ios" ? height/6 : 60,
        position: "absolute",
        zIndex: 50
    },
    textInput: {
        fontSize: 18,
        color: "grey"
    }
})