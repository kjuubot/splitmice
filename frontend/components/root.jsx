import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom'
import App from './app.jsx';

const Root = ({store}) => {

    return (
        <Provider store={store}>
            <HashRouter>
                <Route path="/" component={App} ></Route>
            </HashRouter>
        </Provider>
    );
}

export default Root;