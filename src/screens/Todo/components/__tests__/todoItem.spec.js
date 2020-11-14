import React from 'react'

import TodoItem from '../TodoItem';
import renderer from 'react-test-renderer'

describe("Testing TodoItem Component", () => {
    test("snapshot test", () => {
        const props = {
            data: {
                title: "Title",
                isChecked: true,
                id: 1,
                isRunning: true
            },
            toggleCheckbox: () => { },
            segue: () => { },
            deleteTodo: () => { },
            startTask: () => {},
            xTodoValue: 1
        }
        const tree = renderer.create(<TodoItem {...props} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
