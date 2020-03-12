import React from 'react';

export default class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        };
    }

    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        const listContent = this.props.friends.map((user, idx) => {
            return <li key={idx}><img src={window.images.mouseIcon} className="mouse-icon" /><div className="friend-username"></div>{user.username}</li>;
        });

        return (
            <div className="friends-list">
                <div className="friends-bar">
                    <div>FRIENDS</div>
                    <div className="add-button" onClick={() => this.props.openModal('addFriend')}>+add</div>
                </div>
                <ul>
                    {listContent}
                </ul>
            </div>
        );
    }
}