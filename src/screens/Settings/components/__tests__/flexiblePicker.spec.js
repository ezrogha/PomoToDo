import React from 'react'

import FlexiblePicker from '../FlexiblePicker';
import renderer from 'react-test-renderer'

describe("Testing FlexiblePicker Component", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<FlexiblePicker selectedValue={0} updatePicker={() => {}} itemArray={[0,1,2]} metric={"minutes"} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
