import React from 'react';
import { login } from '../../actions/session_actions';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.handleGuestLogin = this.handleGuestLogin.bind(this);
    }

    handleGuestLogin(e) {
        e.preventDefault();
        const user = { username: "Guest", password: "password" };
        store.dispatch(login(user)) // .then(() => this.props.router.push('/'));
    }

    render() {
        return (
            <div className="homepage-container">
                <section className="main">
                    <p>Less Stress When Sharing Expenses</p>
                    <span className="homepage-guest" onClick={this.handleGuestLogin}>Demo</span>
                    <p>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                </section>
                <div className="img-background"></div>
            </div>
        );
    }
}