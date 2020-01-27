import React, { Component } from 'react'
import { Animated, Easing, SafeAreaView, StyleSheet, TextInput } from 'react-native';

import Clock from './components/Clock';
import Pause from './components/Pause';
import Play from './components/Play';
import TodoInput from './components/TodoInput';

export default class SvgCircularAnimation extends Component {

    constructor() {
        super()

        this.state = {
            // Add clock state 0 = idle, 1 = running, 2 = paused, 3= resumed
            timerInterval: null,
            circleValue: new Animated.Value(0),
            seconds: 25 * 60,
            animationRunning: true,
            todoText: ""
        }
    }

    componentDidMount() {
        this.setState({ timerInterval: this.startTimer(this.state.seconds) })
        Animated.timing(this.state.circleValue, {
            toValue: 1,
            duration: this.state.seconds * 1000,
            easing: Easing.linear
        }).start()
        this.setState({
            animationRunning: true
        })
    }
    
    componentWillUnmount(){
        this.setState({ timerInterval: 0 })
        clearInterval(this.state.timerInterval)
    }

    startTimer = (secs) => {
        setTimeout(() => {
            clearInterval(interval)
        }, (secs + 1) * 1000)
        const interval = setInterval(() => {
            const newSecond = this.state.seconds - 1
            this.setState({ seconds: newSecond })
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
                duration: this.state.seconds * 1000,
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
        return (
            <SafeAreaView style={styles.container}>
                <TodoInput text={this.state.todoText} onChange={this.onChangeTodoText} />
                <Clock seconds={this.state.seconds} renderPausePlay={this.renderPausePlay} circleValue={this.state.circleValue} />
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