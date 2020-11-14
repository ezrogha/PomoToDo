import React, { Component } from 'react'
import { Animated, Easing, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';

import Clock from './components/Clock';
import Pause from './components/Pause';
import Play from './components/Play';
import TodoInput from './components/TodoInput';

class CircularTimerAnimation extends Component {

    constructor() {
        super()

        this.state = {
            timerInterval: null,
            circleValue: new Animated.Value(0),
            seconds: 2,
            animationRunning: false,
            todoText: "",
            sessionInterval: 4,
            sessionIntervalCount: 1,
            pomoState: "work",
            longBreak: 15 * 60,
            longBreakAfter: 4,
            shortBreak: 5 * 60,
            workInterval: 25 * 60,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { navigation: { state: { params = {} } }, timer } = props
        const compareStateProps = (isTitleSet) => {
            if (state.longBreak !== timer.longBreak ||
                state.longBreakAfter !== timer.longBreakAfter ||
                state.shortBreak !== timer.shortBreak ||
                state.workInterval !== timer.workInterval) {
                if (state.animationRunning) {
                    clearInterval(state.timerInterval)
                    return {
                        ...timer,
                        todoText: isTitleSet ? params.title : "",
                        seconds: timer.workInterval,
                        circleValue: new Animated.Value(0),
                        animationRunning: false,
                        sessionIntervalCount: 1,
                        pomoState: "work"
                    }
                }
                return {
                    ...timer,
                    todoText: isTitleSet ? params.title : "",
                    seconds: timer.workInterval,
                    sessionIntervalCount: 1,
                    pomoState: "work"
                }
            }
            return { todoText: isTitleSet ? params.title : "" }
        }

        if ("title" in params) {
            return compareStateProps(true)
        } else {
            return compareStateProps(false)
        }
    }

    componentDidMount() {
        const { workInterval, longBreakAfter } = this.state
        this.setState({ seconds: workInterval, longBreakAfter })
    }

    componentDidUpdate() {
        if (this.state.seconds === 0) {
            clearInterval(this.interval)
        }
    }

    componentWillUnmount() {
        this.setState({ timerInterval: 0 })
        clearInterval(this.state.timerInterval)
    }

    restructureTime = (seconds) => {
        const minutes = seconds / 60
        return seconds + (minutes)
    }

    startTimer = (secs) => {
        const {
            sessionIntervalCount,
            pomoState,
            longBreak,
            longBreakAfter,
            shortBreak,
            workInterval
        } = this.state

        const interval = setInterval(() => {
            if (this.state.seconds === 0) {
                if (pomoState === "work") {
                    this.setState({ sessionIntervalCount: sessionIntervalCount + 1 }, () => {
                        if (sessionIntervalCount === longBreakAfter) {
                            this.setState({
                                pomoState: "long break",
                                seconds: longBreak,
                                animationRunning: false,
                                circleValue: new Animated.Value(0)
                            }, () => {
                                this.setState({
                                    sessionIntervalCount: 1
                                })
                            })
                        } else {

                            this.setState({
                                pomoState: "short break",
                                seconds: shortBreak,
                                animationRunning: false,
                                circleValue: new Animated.Value(0)
                            })
                        }
                    })
                } else {
                    this.setState({
                        pomoState: "work",
                        seconds: workInterval,
                        animationRunning: false,
                        circleValue: new Animated.Value(0)
                    })
                }
                return clearInterval(interval)
            }
            this.setState((state) => ({ seconds: state.seconds - 1 }))
        }, 1000)
        return interval
    }

    pauseAnimation = () => {
        if (this.state.animationRunning) {
            this.state.circleValue.stopAnimation(result => {
                this.setState({
                    animationRunning: false,
                })
                clearInterval(this.state.timerInterval)
            })
        } else {
            Animated.timing(this.state.circleValue, {
                toValue: 1,
                duration: this.restructureTime(this.state.seconds) * 1000,
                easing: Easing.linear
            }).start()
            this.setState({
                animationRunning: true,
                timerInterval: this.startTimer(this.state.seconds)
            })
        }
    }

    renderPausePlay = () => {
        if (this.state.animationRunning) {
            return (
                <Pause pause={this.pauseAnimation.bind(this)} />
            )
        } else {
            return (
                <Play play={this.pauseAnimation.bind(this)} />
            )
        }
    }

    onChangeTodoText = (val) => {
        this.setState({ todoText: val })
    }

    nextSession = () => {
        Alert.alert(
            'Skip Interval',
            'Are you sure You want to skip this interval',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Skip', onPress: () => {
                        this.startTimer()
                        this.setState({ seconds: 0, animationRunning: false }, () => {
                            clearInterval(this.state.timerInterval)
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { todoText, isCaretHidden, seconds, circleValue, isNextDisabled } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <TodoInput text={todoText} onChange={this.onChangeTodoText} />
                <Clock seconds={seconds} renderPausePlay={this.renderPausePlay} circleValue={circleValue} nextSession={this.nextSession.bind(this)} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    timer: state.timer
})

export default connect(mapStateToProps, {})(CircularTimerAnimation)

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "space-between",
        alignItems: "center",
    }
})
