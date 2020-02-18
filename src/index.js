import React, { Component } from 'react'
import { Text as RText, View, Animated, Dimensions, StyleSheet, TouchableOpacity, Easing } from 'react-native'
import Svg, { Circle, Text as SVGText, Polygon, Line, Rect } from 'react-native-svg';

export default class SvgCircularAnimation extends Component {

    constructor() {
        super()

        this.state = {
            // Add clock state 0 = idle, 1 = running, 2 = paused, 3= resumed
            timerInterval: null,
            circleValue: new Animated.Value(0),
            seconds: 10,
            animationRunning: true,
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

    startTimer = (secs) => {
        setTimeout(() => {
            clearInterval(interval)
        }, (secs+1) * 1000)
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
                <>
                    <Rect x="180" y="240" width="35" height="45" strokeWidth="5" onPress={this.pauseAnimation.bind(this)} />
                    <Line x1="185" y1="240" x2="185" y2="285" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="5" />
                    <Line x1="210" y1="240" x2="210" y2="285" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="5" />
                </>
            )
        } else {
            return (
                <Polygon
                    points="180, 235 180, 285 220, 260"
                    fill="black"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="5"
                    onPressIn={this.pauseAnimation.bind(this)}
                />
            )
        }
    }

    addZero = (value) => {
        const valueString = value.toString()
        return valueString.length < 2 ? `0${valueString}` : valueString
    }

    getTime(time){
        const minutes = Math.floor(time/60)
        const seconds = time % 60
        return `${this.addZero(minutes)}:${this.addZero(seconds)}`
    }

    render() {
        const { width } = Dimensions.get('window')
        const strokeWidth = 30
        const size = width - 32
        const radius = (size - strokeWidth * 2) / 2
        const circumference = radius * 2 * Math.PI
        const AnimatedCircle = Animated.createAnimatedComponent(Circle)
        const arc = this.state.circleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2 * Math.PI]
        })
        const strokeDashOffset = Animated.multiply(arc, radius)
        return (
            <View style={styles.container}>
                <Svg width={size} height={size}>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        stroke="rgba(255, 255, 255, 0.4)"
                        fill="none"
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDashoffset={strokeDashOffset}
                        strokeDasharray={`${circumference} ${circumference}`}
                    />
                    <AnimatedCircle
                        cx={size / 2}
                        cy={size / 2}
                        stroke="#FFA914"
                        fill="none"
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDashoffset={strokeDashOffset}
                        strokeDasharray={`${circumference} ${circumference}`}
                    />
                    {this.renderPausePlay()}
                    <SVGText x={(size / 5) + 5} y={(size / 2) + 10} fontSize="80" stroke="rgba(255, 255, 255, 0.4)">{this.getTime(this.state.seconds)}</SVGText>
                </Svg>
                <TouchableOpacity onPress={this.pauseAnimation} style={styles.button}>
                    <RText style={{ fontSize: 20 }}>Pause</RText>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#FFA914",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 40,
        borderRadius: 2
    }
})
