import React from 'react'

import AddButton from '../AddButton';
import renderer from 'react-test-renderer'

describe("Testing AddButton Component", () => {
    test("snapshot test", () => {
        const props = {
            navigate: () => {}
        }
        const tree = renderer.create(<AddButton { ...props }/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
