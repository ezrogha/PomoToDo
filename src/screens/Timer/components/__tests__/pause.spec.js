import React from 'react'

import Pause from '../Pause';
import renderer from 'react-test-renderer'

describe("Testing Pause Component", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Pause />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
