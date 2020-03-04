import React from 'react';
import { Provider } from 'react-redux';
import { Link, Route, IndexRoute, Switch } from 'react-router-dom';
import GreetingContainer from "./greeting/greeting_container";
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const _redirectIfLoggedIn = (nextState, replace) => {
    if (store.getState().session.currentUser) {
        replace('/');
    }
}

const _redirectIfLoggedOut = (nextState, replace) => {
    if (store.getState().session.currentUser === null) {
        replace('/login');
    }
}

const App = () => (
    <div>
        <header className="nav-bar">
            <Link id="navbar-logo" to="/">Splitmice</Link>
            <GreetingContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} onEnter={_redirectIfLoggedIn} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} onEnter={_redirectIfLoggedIn} />
            {/* <IndexRoute component={HomePage} /> */}
            {/* <Route path="/login" component={LoginFormContainer} onEnter={_redirectIfLoggedIn} /> */}
            {/* <Route path="/dashboard" component={DashboardContainer} onEnter={_redirectIfLoggedOut} /> */}
        </Switch>
    </div>
);

export default App;