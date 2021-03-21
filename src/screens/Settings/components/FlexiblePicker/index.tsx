import React from 'react'
import { Picker } from 'react-native'

interface Props {
    itemArray: string[],
    selectedValue: number,
    metric: number | string,
    updatePicker: (value: string) => void
}

const FlexiblePicker: React.FC<Props> = ({ selectedValue, updatePicker, itemArray, metric }) => {
    const renderPickerItems = () => {
        return itemArray.map((value, index) => {
            return <Picker.Item key={index} label={`${value} ${value !== "Custom" ? metric : ''}`} value={value} />
        })
    }
    
    return (
        <Picker selectedValue={selectedValue} onValueChange={updatePicker} >
            {renderPickerItems()}
        </Picker>
    )
}

export default FlexiblePicker