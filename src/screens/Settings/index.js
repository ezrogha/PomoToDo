import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Picker, Dimensions } from 'react-native';
import ListItem from './components/ListItem';
import FlexiblePicker from './components/FlexiblePicker';

const { width, height } = Dimensions.get('window')

export default class Settings extends Component {
    state = {
        workInterval: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakAfter: 4,
        pickerSelectedValue: 0,
        pickerItemArray: [],
        pickerMetric: ''
    }

    onUpdatePicker = (value, selectedStateKey, array, metric ) => {
        this.setState({ workInterval: value })
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ height: 10 }} />
                    <View style={styles.listContainer}>
                        <ListItem title="Work Interval" value={`${this.state.workInterval} minutes`} />
                        <ListItem title="Short Break" value={`${this.state.shortBreak} minutes`} />
                        <ListItem title="Long Break" value={`${this.state.longBreak} minutes`} />
                        <ListItem title="Long Break After" value={`${this.state.longBreakAfter} intervals`} />
                    </View>

                    <View>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderText}>NOTIFICATIONS</Text>
                        </View>
                        <View style={styles.listContainer}>
                            <ListItem title="End Break Sound" value="Alarm Clock" />
                            <ListItem title="Work Completion Sound" value="Alarm Clock" />
                        </View>
                    </View>

                    <View>
                        <FlexiblePicker
                            selectedValue={this.state.workInterval}
                            updatePicker={this.onUpdatePicker}
                            itemArray={[25, 20, 15]}
                            metric={'minutes'}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: 'lightgrey',
        paddingLeft: 10,
        marginBottom: 25
    },
    listHeader: {
        marginLeft: 15,
        marginVertical: 7
    },
    listHeaderText: {
        fontSize: 13,
        color: 'grey'
    }
})
