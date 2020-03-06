import { connect } from 'react-redux';
import React from 'react';
import { login } from '../../actions/session_actions';
import Homepage from './homepage';

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
    };
};

export default connect(null, mapDispatchToProps)(Homepage);