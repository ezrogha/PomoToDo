import React, { Component } from 'react'
import { Animated, Easing, SafeAreaView, StyleSheet, TextInput } from 'react-native';

import Clock from './components/Clock';
import Pause from './components/Pause';
import Play from './components/Play';
import TodoInput from './components/TodoInput';

export default class CircularTimerAnimation extends Component {

    constructor() {
        super()

        this.state = {
            // Add clock state 0 = idle, 1 = running, 2 = paused, 3= resumed
            timerInterval: null,
            circleValue: new Animated.Value(0),
            seconds: 25 * 60,
            animationRunning: false,
            todoText: ""
        }
    }

    restructureTime = (seconds) => {
        const minutes = seconds / 60
        return seconds + (minutes - 1)
    }

    static getDerivedStateFromProps(props, state) {
        const { state: { params = {} } } = props.navigation
        if ("title" in params) {
            return { todoText: params.title }
        }
        return null
    }

    componentWillUnmount() {
        this.setState({ timerInterval: 0 })
        clearInterval(this.state.timerInterval)
    }

    startTimer = (secs) => {
        const interval = setInterval(() => {
            if (this.state.seconds === 0) {
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
    componentDidUpdate() {
        if (this.state.seconds === 0) {
            clearInterval(this.interval)
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

    render() {
        const { todoText, isCaretHidden, seconds, circleValue } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <TodoInput text={todoText} onChange={this.onChangeTodoText} />
                <Clock seconds={seconds} renderPausePlay={this.renderPausePlay} circleValue={circleValue} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "space-between",
        alignItems: "center",
    }
})
