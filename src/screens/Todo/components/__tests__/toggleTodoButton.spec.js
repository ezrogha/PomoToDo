import React from 'react'

import ToggleTodoButton from '../ToggleTodoButton';
import renderer from 'react-test-renderer'

describe("Testing ToggleTodoButton Component", () => {
    test("snapshot test", () => {
        const props = {
            todoTabState: false,
            doneTabState: true,
            changeTab: () => {},
        }
        const tree = renderer.create(<ToggleTodoButton { ...props } />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
