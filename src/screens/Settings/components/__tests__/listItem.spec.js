import React from 'react'

import ListItem from '../ListItem';
import renderer from 'react-test-renderer'

describe("Testing ListItem", () => {
    test("should render correctly", () => {
        const tree = renderer.create(<ListItem />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
