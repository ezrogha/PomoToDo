import React, { useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import sounds from '../../../Alarms/Sounds'

interface Alarm {
    name: string,
    module: any
}

const EndBreak: React.FC = () => {
    const [selectedSound, setSelectedSound] = useState("")

    const chooseAlarm = async (alarm: Alarm) => {
        setSelectedSound(alarm.name)
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(alarm.module);
            await soundObject.playAsync();
            setTimeout(async () => {
                await soundObject.stopAsync()
            }, 2000)
            // Alarm playing!
        } catch (error) {
            // An error
        }
    }

    const renderAlarms = () => {
        return sounds.map((item) => {
            const lastItemIndex = sounds.length - 1
            const lastItemName = sounds[lastItemIndex].name
            return (
                <View key={JSON.stringify(item.name)} style={{
                    borderBottomWidth: 0.8,
                    borderBottomColor: lastItemName === item.name ? "transparent" : "lightgrey",
                    marginLeft: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => chooseAlarm(item)}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 20,
                            paddingVertical: 0,
                            height: 50,
                            alignItems: "center",
                        }}>
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        {selectedSound === item.name && <Ionicons name="ios-checkmark" color="green" size={25} />}
                    </TouchableOpacity>
                </View>
            )
        })
    }

    return (
            <ScrollView>
                <View style={{
                    backgroundColor: "white",
                    flex: 1,
                    borderBottomColor: "lightgrey",
                    borderTopColor: "lightgrey",
                    borderBottomWidth: 0.8,
                    borderTopWidth: 0.8,
                }}>
                    {renderAlarms()}
                </View>
            </ScrollView>

    )
}

export default EndBreak