import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ( { currentUser, logout }) => {
    const loggedOutNav = () => (
        <nav className="navbar-loggedout">
            <Link id="navbar-login" to="/login">Log in</Link>
            <Link id="navbar-signup" to="/signup">Sign up</Link>
        </nav>
    );
    const loggedInNav = () => (
        <hgroup className="navbar-loggedin">
            <Link id="navbar-logout" to="/" onClick={logout}>Log out</Link>
        </hgroup>
    );

    return currentUser ? loggedInNav() : loggedOutNav();
};

export default Navbar;