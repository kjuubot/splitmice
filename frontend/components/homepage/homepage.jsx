import React from 'react';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.handleGuestLogin = this.handleGuestLogin.bind(this);
    }

    handleGuestLogin(e) {
        e.preventDefault();
        const user = { username: "Guest", password: "password" };
        this.props.login(user).then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div className="homepage-container">
                <section>
                    <div className="homepage-background"></div>
                    <img className="splash-logo" src={window.images.splash}></img>
                    <div className="homepage-tagline">makes it easy to share the things you love.</div>
                    <div className="homepage-value">Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</div>
                    <button className="guest-demo" onClick={this.handleGuestLogin}>Guest Demo</button>
                </section>
                <div className="footer">Free for <i className="devicon-apple-original colored"></i>iPhone, <i className="devicon-android-plain colored"></i>Android, and web.</div>
            </div>
        );
    }
}