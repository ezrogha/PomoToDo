import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ({ navigate }) => (
    <TouchableOpacity style={styles.iconContainer} onPress={navigate(this, 'TodoDetails')}>
        <Ionicons name="ios-add" size={36} color="white" />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    iconContainer: {
        marginLeft: 20,
        marginBottom: 5,
        padding: 5,
        shadowColor: "transparent"
    }
})
