import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default () => (
    <TouchableOpacity style={{ marginLeft: 20, marginBottom: 5, padding: 5, shadowColor: "transparent" }} onPress={() => alert('h gjbh')}>
        <Ionicons name="ios-add" size={36} color="white" />
    </TouchableOpacity>
)
