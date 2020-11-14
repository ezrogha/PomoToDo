import React from 'react'

import TodoInput from '../TodoInput';
import renderer from 'react-test-renderer'

describe("Testing TodoInput Component", () => {
    test("should render correctly", () => {
        const tree = renderer.create(<TodoInput />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
