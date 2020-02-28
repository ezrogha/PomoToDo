import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { connect } from 'react-redux';

import { setWorkCompletion, setEndBreak } from '../../store/actions/alarmActions'

import sounds from './Sounds'

class Alarms extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state: { params = {} } } = navigation
        const headerTitle = params.route
        const headerStyle = {
            backgroundColor: '#009DDD'
        }
        const headerTintColor = '#fff'
        return { headerTitle, headerStyle, headerTintColor }
    }

    state = {
        completionSound: "",
        endBreakSound: ""
    }

    chooseAlarm = async (alarm) => {
        const { navigation: { state: { params = {} }}, setEndBreak, setWorkCompletion } = this.props
        if(params.route === "End Break") {
            setEndBreak(alarm.name)
        } else {
            setWorkCompletion(alarm.name)
        }
        
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
            console.log("Error", error)
        }
    }

    renderAlarms = () => {
        const { state: { params = {} } } = this.props.navigation
        const { end_break_sound, work_completion_sound } = this.props.alarm
        let selectedSound = ""
        if(params.route === "End Break") {
            selectedSound = end_break_sound
        } else {
            selectedSound = work_completion_sound
        }
        return sounds.map((item) => {
            const lastItemIndex = sounds.length - 1
            const lastItemName = sounds[lastItemIndex].name
            return (
                <View key={item.name} style={{
                    borderBottomWidth: 0.8,
                    borderBottomColor: lastItemName === item.name ? "transparent" : "lightgrey",
                    marginLeft: 20,
                }}>
                    <TouchableOpacity
                        onPress={this.chooseAlarm.bind(this, item)}
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

    render() {
        return (
            <ScrollView>
                <View style={{
                    marginTop: 10,
                    backgroundColor: "white",
                    flex: 1,
                    borderBottomColor: "lightgrey",
                    borderTopColor: "lightgrey",
                    borderBottomWidth: 0.8,
                    borderTopWidth: 0.8,
                }}>
                    {this.renderAlarms()}
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    alarm: state.alarm,
})

export default connect(mapStateToProps, {
    setWorkCompletion,
    setEndBreak
})(Alarms)
