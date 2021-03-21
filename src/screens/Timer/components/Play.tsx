import React  from 'react'
import { Polygon } from 'react-native-svg';

type Props = {
    play: () => void
}

export default ({ play }: Props) => (
    <Polygon
        points="180,235 180,285 220,260"
        fill="white"
        stroke="#009DDD"
        strokeWidth="5"
        onPressIn={play}
    />
)
