import React from 'react'

import Settings from '..';
import renderer from 'react-test-renderer'

describe("<Settings /> ", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Settings />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
