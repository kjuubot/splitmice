import React from 'react';

export default class Friends extends React.Component {
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
            this.props.searchUsers(e.target.value).then(users => { console.log('success'); })
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
            }, err => {
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

        let formContent;
        formContent = (
            <div className="add-friends-modal">
                <fieldset className="add-friend-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="friend-input">
                            <input type="text" value={this.state.username} placeholder="Type a username" onChange={this.userQuery('username')} />

                            <br />

                            <ul className="add-friend-search">
                                {searchList}
                            </ul>
                        </div>

                        <div className="add-friend-button-group">
                            <div className="add-friend-button">
                                <input type="submit" value="Add Friend"></input>
                            </div>
                        </div>
                    </form>
                </fieldset>
            </div>
        );

        const listContent = this.props.friends.map((user, idx) => {
            return <li key={idx}><div className="friend-username"></div>{user.username}</li>;
        });

        return (
            <div>
                {formContent}
                <div className="friends-list">
                    <div className="friends-bar">
                        <div>friends</div>
                        <div onClick={() => this.props.openModal('addFriend')}>+add</div>
                    </div>
                    <ul>
                        {listContent}
                    </ul>
                </div>
            </div>
        );
    }
}