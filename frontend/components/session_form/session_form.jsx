import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => this.props.history.push('/dashboard'));
    }

    render() {
        let content;

        const loginErrors = this.props.errors.map((el, idx) => {
            return (
                <li key={`${idx}`}>{el}</li>
            );
        });

        if (this.props.formType === 'login') {
            content = (
                <div className="login-container">
                    <fieldset className="login-form-box">
                        <div className="login-welcome">welcome back!</div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text" value={this.state.username} placeholder="Username" onChange={this.update('username')}/>
                            </label>
                            <br />
                            <label>
                                <input type="password" placeholder="Password" value={this.state.password} onChange={this.update('password')}/>
                            </label>
                            <br />
                            <input type="submit" className="login-page-button" value='log in'></input>

                            <div className="signup-prompt">New to Splitmice? <Link className="signup-link" to="/signup">Sign up now!</Link></div>

                            <ul className="login-errors">{loginErrors} </ul>
                        </form>
                    </fieldset>
                    <img src={window.images.login} id="login-mouse"></img>
                </div>
            );
        } else {
            content = (
                <div className="login-container">
                    <fieldset className="login-form-box">
                        <div className="login-welcome">welcome to splitmice</div>
                        <form onSubmit={this.handleSubmit} className="login-form">
                            <label>
                                <input type="text" value={this.state.username} placeholder="Pick a username" onChange={this.update('username')} />
                            </label>
                            <br />
                            <label>
                                <input type="text" value={this.state.email} placeholder="Enter your email address" onChange={this.update('email')} />
                            </label>
                            <br />
                            <label>
                                <input type="password" placeholder="Create a password" value={this.state.password} onChange={this.update('password')} />
                            </label>
                            <br />
                            <input type="submit" className="login-page-button" value='sign me up'></input>
                            <div className="signup-prompt">Already have an account? <Link className="signup-link" to="/login">Log in.</Link></div>
                            <ul className="login-errors">{loginErrors}</ul>
                        </form>
                    </fieldset>
                    <img src={window.images.signup} id="signup-mouse"></img>
                </div>
            );
        }

        return(content);
    }
}