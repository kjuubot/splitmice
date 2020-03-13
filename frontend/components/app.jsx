import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Modal from '../components/modal/modal';
import Homepage from '../components/homepage/homepage';
import NavbarContainer from "./navbar/navbar_container";
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import DashboardContainer from './dashboard/dashboard_container';
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

// let navRoute = store.getState().session.currentUser ? "/" : "/dashboard";
const App = () => (
    <div>
        <Modal />
        <header className="navbar">
            <Link className="navbar-logo" to="/">
                <img src={window.images.logo} className="logo" />
                <span id="app-name">Splitmice</span>
            </Link>
            <NavbarContainer />
        </header>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} onEnter={_redirectIfLoggedIn} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} onEnter={_redirectIfLoggedIn} />
            <ProtectedRoute path="/dashboard" component={DashboardContainer} onEnter={_redirectIfLoggedOut} />
        </Switch>
    </div>
);

export default App;