import React from 'react';

export default class SettleUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            settleUpFrom: '',
            settleUpTo: '',
            amount: '',
            searchType: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseSettleUpFrom = this.chooseSettleUpFrom.bind(this);
        this.chooseSettleUpTo = this.chooseSettleUpTo.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    queryUsers(input) {
        return (
            e => {
                this.setState({ [input]: e.target.value });
                this.setState({ searchType: input });
                this.props.searchFriends(e.target.value).then(users => { console.log("success"); });
            }
        );
    }

    update(input) {
        return (
            e => {
                this.setState({ [input]: e.target.value });
                this.setState({ searchType: '' });
            }
        );
    }

    clearState() {
        this.setState({ settleUpFrom: '', settleUpTo: '', amount: '', searchType: '' });
    }

    handleSubmit(e) {
        e.preventDefault();
        const settleUpData = { settleUpFrom: this.findId(this.state.settleUpFrom), settleUpTo: this.findId(this.state.settleUpTo), amount: this.state.amount };

        this.props.settleUpBill(settleUpData).then(
            () => {
                this.props.closeModal();
                this.props.clearSearch();
                this.clearState();
            }, err => {
                this.props.clearSearch();
                this.clearState();

            }
        );
    }

    handleClick(arg) {
        e.preventDefault();

        if (arg === 'settleUpFrom') {
            this.setState({ searchType: 'settleUpFrom' });
        } else if (arg === 'settleUpTo') {
            this.setState({ searchType: 'settleUpTo' });
        } else {
            this.setState({ searchType: '' });
        }
    }

    findId(username) {
        if (username === 'You') {
            return this.props.currentUser.id
        } else {
            const friends = this.props.friends;
            for (let user_key in friends) {
                let user = friends[user_key];
                if (user.username === username) {
                    return user.id;
                }
            }
        }
    }

    chooseSettleUpFrom(e) {
        e.preventDefault();
        const username = e.currentTarget.textContent.replace(/\s/g, '');

        if (username === this.props.currentUser.username) {
            this.setState({ settleUpFrom: 'You' });
        } else {
            this.setState({ settleUpFrom: username });
        }

        this.setState({ searchType: '' });
    }

    chooseSettleUpTo(e) {
        e.preventDefault();
        const username = e.currentTarget.textContent.replace(/\s/g, '');

        if (username === this.props.currentUser.username) {
            this.setState({ settleUpTo: 'You' });
        } else {
            this.setState({ settleUpTo: username });
        }

        this.setState({ searchType: '' });
    }

    render() {
        const friendArray = Object.values(this.props.friends);

        const settleUpFromList = friendArray.map((user, idx) => {
            return <li key={idx} onClick={this.chooseSettleUpFrom}>{user.username}</li>;
        });

        settleUpFromList.unshift(
            <li key={Object.keys(this.props.friends).length} onClick={this.chooseSettleUpFrom}>{this.props.currentUser.username}</li>
        )

        const settleUpToList = friendArray.map((user, idx) => {
            return <li key={idx} onClick={this.chooseSettleUpTo}>{user.username}</li>;
        });

        settleUpToList.unshift(
            <li key={Object.keys(this.props.friends).length} ondClick={this.chooseSettleUpTo}>{this.props.currentUser.username}</li>
        )

        let formContent;
        formContent = (
            <div className="settle-up-modal">
                    <div className="main-settle-up-modal">
                        <h1>Settle Up</h1>
                        <fieldset className="settle-up-form">
                            <form onSubmit={this.handleSubmit}>

                                <div className="settle-up-info">

                                    <div className="settle-up-payment">
                                        <input type="text" value={this.state.settleUpFrom} placeholder="Enter Payer" onClick={() => this.handleClick("settleUpFrom")} />

                                        <div>Paid</div>

                                        <input type="text" value={this.state.settleUpTo} placeholder="Enter Recipient" onClick={() => this.handleClick("settleUpTo")} />
                                    </div>

                                    <input type="number" value={this.state.amount} placeholder="$0.00" onChange={this.update('amount')} />
                                </div>

                                <br />

                                <div className="settle-up-button-group">
                                    <div className="add-friend-button">
                                        <input type="submit" value="Save"></input>
                                    </div>
                                </div>

                            </form>
                        </fieldset>
                    </div>
                    <br />

                    {this.state.searchType === 'settleUpFrom' ? (
                        <div className="side-modal">
                            <h1>Choose a Payer</h1>
                            <ul className="settle-up-user-list">
                                {settleUpFromList}
                            </ul>
                        </div>
                    ) : (
                            <div></div>
                        )}

                    {this.state.searchType === 'settleUpTo' ? (
                        <div className="side-modal">
                            <h1>Choose a Recipient</h1>
                            <ul className="settle-up-user-list">
                                {settleUpToList}
                            </ul>
                        </div>
                    ) : (
                            <div></div>
                        )}
            </div>
        );

        return (
            <div>
                {formContent}
            </div>
        );
    }
}