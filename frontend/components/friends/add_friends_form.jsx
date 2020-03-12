import React from 'react';

export default class AddFriendsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        };

        this.chooseUser = this.chooseUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getFriends();
    }

    userQuery(input) {
        return ( e => {
            this.setState({ [input]: e.target.value });
            this.props.searchUsers(e.target.value)
        });
    }

    clearState() {
        this.setState({username: '', email: ''});
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = { username: this.state.username, email: this.state.email };
        this.props.processFriendForm(user).then(
            () => {
                this.props.closeModal();
            }, () => {
                this.clearState();
            }
        );
    }

    chooseUser(e) {
        e.preventDefault();
        const username = e.currentTarget.textContent.replace(/\s/g, '');
        this.setState({ username: username });
        this.props.clearSearch();
    }

    render() {
        const searchList = this.props.search.map((el, idx) => {
            return <li key = {idx} onClick = { this.chooseUser }> {el.username} </li>
        });

        const friendshipErrors = this.props.errors.map((el, idx) => {
            return (
                <li key={`${idx}`}>{el}</li>
            );
        });

        let formContent;
        formContent = (
            <div className="add-friends-modal">
                <fieldset className="add-friend-form">
                    <div id="find-a-friend">FIND A FRIEND</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="friend-input">
                            <input type="add-friend-username" value={this.state.username} placeholder="Search by username" onChange={this.userQuery('username')} />
                            <br />
                            <ul className="add-friend-search">
                                {searchList}
                            </ul>
                        </div>

                        <div className="add-friend-button-group">
                            <input className="add-friend-button" type="submit" value="Add Friend"></input>
                        </div>

                        <ul className="friendship-errors">{friendshipErrors}</ul>
                    </form>
                </fieldset>
            </div>
        );

        return (
            <div>
                {formContent}
            </div>
        );
    }
}