import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store'


import App from './src/navigation'


export default () => {
    return (
        <Provider store={configureStore()}>
            <App />
        </Provider>
    )
}