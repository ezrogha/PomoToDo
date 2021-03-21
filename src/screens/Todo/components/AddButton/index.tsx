import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    navigate: (screen: string) => void
}

export default ({ navigate }: Props) => (
    <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('TodoDetails')}>
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
