import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.handleGuestLogin = this.handleGuestLogin.bind(this);
    }

    handleGuestLogin(e) {
        e.preventDefault();
        const user = { username: "Guest", password: "password" };
        this.props.guestLogin(user).then(() => this.props.history.push('/dashboard'));
    }

    render() {
        return (
            <div className="homepage-container">
                <div className="homepage-background"></div>
                <div className="homepage-tagline">Splitmice makes it easy to share the things you love.</div>
                <img className="splash-image" src={window.images.splash}></img>
                <button className="guest-demo" onClick={this.handleGuestLogin}>Guest Demo</button>
                <div className="homepage-value">
                    Keep track of your shared expenses with housemates, trips, groups, friends, and family.
                </div>
                <div className="footer">Free for <i className="devicon-apple-original colored"></i>iPhone, <i className="devicon-android-plain colored"></i>Android, and web.</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        guestLogin: user => dispatch(login(user)),
    };
};

export default connect(null, mapDispatchToProps)(Homepage);