import React from 'react'
import { Line, Rect } from 'react-native-svg';

export default ({ pause }) => (
    <>
        <Rect x="180" y="240" width="35" height="45" fill="white" onPress={pause} />
        <Line x1="185" y1="240" x2="185" y2="285" stroke="#009DDD" strokeWidth="5" />
        <Line x1="210" y1="240" x2="210" y2="285" stroke="#009DDD" strokeWidth="5" />
    </>
)
