import React from 'react'

import Play from '../Play';
import renderer from 'react-test-renderer'

describe("Testing Play Component", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Play />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
