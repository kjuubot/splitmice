import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import NavbarContainer from "./navbar/navbar_container";
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Homepage from './homepage/homepage';
// import logo from '../../app/assets/images/logo.png'

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
            <Link id="navbar-logo" to="/">
                {/* <img src="../../app/assets/images/logo.png" /> Splitmice */}
                {/* <img src={logo} /> Splitmice */}
            </Link>
            <NavbarContainer />
        </header>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} onEnter={_redirectIfLoggedIn} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} onEnter={_redirectIfLoggedIn} />
            {/* <Route path="/login" component={LoginFormContainer} onEnter={_redirectIfLoggedIn} /> */}
            {/* <Route path="/dashboard" component={DashboardContainer} onEnter={_redirectIfLoggedOut} /> */}
        </Switch>
    </div>
);

export default App;