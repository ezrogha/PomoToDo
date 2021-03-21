import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Easing,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { setWorkInterval, setShortBreak, setLongBreak, setLongBreakAfter } from '../../store/actions/timerActions';
import ListItem from './components/ListItem';
import FlexiblePicker from './components/FlexiblePicker';

const { width, height } = Dimensions.get('window');

const workIntervalTimes = ["Custom", 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
const shortBreakTimes = ["Custom", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]
const longBreakTimes = ["Custom", 0, 5, 10, 15, 20, 25, 30, 35, 40]
const intervalTimes = ["Custom", 0, 2, 3, 4, 5, 6, 7, 8, 9, 10]

interface State {
    workInterval: number,
    shortBreak: number,
    longBreak: number,
    longBreakAfter: number,
    currentListItem: string,
    pickerSelectedValue: number | string,
    pickerItemArray: any[],
    pickerMetric: string,
    displayModal: boolean,
    xModalValue: Animated.Value,
    opacityModalValue: Animated.Value,
    showCustomInputbox: boolean,
    customPickerInputValue: number | string
}

interface Route {
    route: string
}

interface NavigationProps {
    state: {
        params?: {
            route?: string
        }
    },
    navigate: (screen: string, route: Route) => void
}

interface Props {
    navigation: NavigationProps,
    setWorkInterval: (value: string) => void,
    setShortBreak: (value: string) => void,
    setLongBreak: (value: string) => void,
    setLongBreakAfter: (value: string) => void,
}

interface AnimatedOptions {
    toValue: number,
    duration: number,
    easing: Easing["linear"]
}

type TriggerModal = {
    list: any[],
    selectedValue: number,
    listItem: string,
    metric: string
}

class Settings extends Component<Props, State> {
    state = {
        workInterval: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakAfter: 4,
        currentListItem: '',
        pickerSelectedValue: 0,
        pickerItemArray: [],
        pickerMetric: '',
        displayModal: false,
        xModalValue: new Animated.Value(-(height / 2)),
        opacityModalValue: new Animated.Value(0),
        showCustomInputbox: false,
        customPickerInputValue: ''
    }

    onUpdatePicker = (value: string) => {
        if (value === "Custom") {
            this.setState({
                showCustomInputbox: true,
                pickerSelectedValue: value
            })
            this._customTextInput.focus()
        } else {
            this.setState({
                showCustomInputbox: false,
                pickerSelectedValue: value,
            })
        }
    }

    chooseAlarm = (route: string) => {
        this.props.navigation.navigate("Alarms", { route })
    }

    triggerModal = ({ list, selectedValue, listItem, metric }: TriggerModal) => {
        this.setState({
            displayModal: true,
            pickerItemArray: list,
            pickerSelectedValue: selectedValue,
            currentListItem: listItem,
            pickerMetric: metric
        })
        Animated.parallel([
            Animated.timing(this.state.xModalValue, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(this.state.opacityModalValue, {
                toValue: 1,
                duration: 100,
                easing: Easing.linear
            })
        ]).start()
    }

    hideModal = () => {
        Animated.parallel([
            Animated.timing(this.state.xModalValue, {
                toValue: -(height / 2),
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(this.state.opacityModalValue, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear
            })
        ]).start(() => {
            this.setState({
                displayModal: false
            })
        })
    }

    setTimerValues = (selectedValue: string) => {
        const { currentListItem, } = this.state
        const { setWorkInterval, setShortBreak, setLongBreak, setLongBreakAfter } = this.props
        if (currentListItem === "workInterval") {
            setWorkInterval(selectedValue)
        } else if (currentListItem === "shortBreak") {
            setShortBreak(selectedValue)
        } else if (currentListItem === "longBreak") {
            setLongBreak(selectedValue)
        } else if (currentListItem === "longBreakAfter") {
            setLongBreakAfter(selectedValue)
        }
    }

    savePickerValue = () => {
        const { currentListItem, pickerSelectedValue, customPickerInputValue } = this.state
        // @ts-ignore
        if (this.state.pickerSelectedValue === "Custom") {
            this.setTimerValues(customPickerInputValue)
            this.setState({
                [currentListItem]: customPickerInputValue
            }, () => {
                this.setState({
                    customPickerInputValue: 0,
                    showCustomInputbox: false
                })
            })
        } else {
            this.setTimerValues(pickerSelectedValue)
            this.setState({
                [currentListItem]: pickerSelectedValue
            })
        }
        this.hideModal()
    }

    render() {
        const { end_break_sound, work_completion_sound } = this.props.alarm
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ height: 10 }} />
                    <View style={styles.listContainer}>
                        <ListItem title="Work Interval" value={`${this.state.workInterval} minutes`} triggerModal={this.triggerModal.bind(this, { list: [...workIntervalTimes], selectedValue: this.state.workInterval, listItem: "workInterval", metric: "minutes" })} />
                        <ListItem title="Short Break" value={`${this.state.shortBreak} minutes`} triggerModal={this.triggerModal.bind(this, { list: [...shortBreakTimes], selectedValue: this.state.shortBreak, listItem: "shortBreak", metric: "minutes" })} />
                        <ListItem title="Long Break" value={`${this.state.longBreak} minutes`} triggerModal={this.triggerModal.bind(this, { list: [...longBreakTimes], selectedValue: this.state.longBreak, listItem: "longBreak", metric: "minutes" })} />
                        <ListItem title="Long Break After" value={`${this.state.longBreakAfter} intervals`} triggerModal={this.triggerModal.bind(this, { list: [...intervalTimes], selectedValue: this.state.longBreakAfter, listItem: "longBreakAfter", metric: "intervals" })} />
                    </View>

                    <View>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderText}>NOTIFICATIONS</Text>
                        </View>
                        <View style={styles.listContainer}>
                            <ListItem title="End Break Sound" value={end_break_sound} chooseAlarm={this.chooseAlarm.bind(this, "End Break")} />
                            <ListItem title="Work Completion Sound" value={work_completion_sound} chooseAlarm={this.chooseAlarm.bind(this, "Work Completion")} />
                        </View>
                    </View>

                </ScrollView>
                <Animated.View style={[styles.PopupContainer, {
                    display: this.state.displayModal ? "flex" : "none",
                    opacity: this.state.opacityModalValue
                }]}>
                    <Animated.View style={[styles.PickerView, { bottom: this.state.xModalValue }]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity style={styles.PickerButton} onPress={this.hideModal}>
                                <Text style={styles.PickerButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TextInput
                                selectionColor={'#007BBB'}
                                // keyboardType="numeric"
                                value={this.state.customPickerInputValue}
                                onChangeText={(value) => this.setState({ customPickerInputValue: value })}
                                ref={component => this._customTextInput = component}
                                style={[styles.customPickerInput, { opacity: this.state.showCustomInputbox ? 1 : 0 }]}
                            />
                            <TouchableOpacity style={styles.PickerButton} onPress={this.savePickerValue}>
                                <Text style={styles.PickerButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                        <FlexiblePicker
                            selectedValue={this.state.pickerSelectedValue}
                            updatePicker={this.onUpdatePicker}
                            itemArray={this.state.pickerItemArray}
                            metric={this.state.pickerMetric}
                        />
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    alarm: state.alarm,
    timer: state.timer
})

export default connect(mapStateToProps, {
    setWorkInterval,
    setShortBreak,
    setLongBreak,
    setLongBreakAfter
})(Settings)

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
    },
    PickerButton: {
        marginHorizontal: 5,
        padding: 10
    },
    PickerButtonText: {
        fontSize: 18,
        color: "#007BBB"
    },
    PopupContainer: {
        position: "absolute",
        width,
        height,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    PickerView: {
        backgroundColor: "#fff",
        position: "absolute",
        width,
        height: height / 2
    },
    customPickerInput: {
        width: 50,
        borderColor: "#007BBB",
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 5,
        marginTop: 10,
        marginRight: 20
    }
})
