import React from 'react';
import { View, Dimensions, Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SVGText } from 'react-native-svg';

import { getTime } from '../../../utils/helpers';

const { width } = Dimensions.get('window')
const strokeWidth = 20
const size = width - 32
const radius = (size - strokeWidth * 2) / 2
const circumference = radius * 2 * Math.PI
const AnimatedCircle = Animated.createAnimatedComponent(Circle)


export default ({ seconds, renderPausePlay, circleValue }) => {
    const arc = circleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2 * Math.PI]
    })
    const strokeDashoffset = Animated.multiply(arc, radius)
    const circleProps = { cx: size / 2, cy: size / 2, fill: "none", r: radius, strokeWidth, strokeDashoffset, strokeDasharray: `${circumference} ${circumference}` }
    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    {...circleProps}
                    stroke="lightgrey"
                />
                <AnimatedCircle
                    {...circleProps}
                    stroke="#009DDD"
                />
                {renderPausePlay()}
                <SVGText x={(size / 5) + 5} y={(size / 2) + 10} fontSize="80" fill="#009DDD" strokeWidth="2">{getTime(seconds)}</SVGText>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center"
    }
})
