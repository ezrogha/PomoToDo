import React  from 'react'
import { Polygon } from 'react-native-svg';

export default ({ play }) => (
    <Polygon
        points="180,235 180,285 220,260"
        fill="white"
        stroke="#009DDD"
        strokeWidth="5"
        onPressIn={play}
    />
)
