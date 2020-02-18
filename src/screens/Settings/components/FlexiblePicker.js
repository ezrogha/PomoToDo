import React from 'react'
import { Picker } from 'react-native'

export default ({ selectedValue, updatePicker, itemArray, metric }) => {
    const renderPickerItems = () => {
        return itemArray.map((value, index) => {
            return <Picker.Item key={index} label={`${value} ${metric}`} value={value} />
        })
    }
    
    return (
        <Picker selectedValue={selectedValue} onValueChange={updatePicker} >
            {renderPickerItems()}
        </Picker>
    )
}

