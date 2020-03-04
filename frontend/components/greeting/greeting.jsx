import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        <nav className="navbar-loggedout">
            <Link id="navbar-login" to="/login">Log in</Link>
            {/* &nbsp;or&nbsp; */}
            <Link id="navbar-signup" to="/signup">Sign up</Link>
        </nav>
    );
    const personalGreeting = () => (
        <hgroup className="navbar-loggedin">
            <h2 className="navbar-name">Hi, {currentUser.username}!</h2>
            <button id="navbar-logout" onClick={logout}>Log out</button>
        </hgroup>
    );

    return currentUser ? personalGreeting() : sessionLinks();
};

export default Greeting;