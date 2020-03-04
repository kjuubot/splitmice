import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom'
import App from './app.jsx';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
// import DashboardContainer from './dashboard/dashboard_container.jsx';
// import HomePage from './homepage/homepage.jsx';

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