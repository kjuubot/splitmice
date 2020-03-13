import React from 'react';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipients: [],
            title: '',
            amount: '',
            date: '',
            numPeople: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseUser = this.chooseUser.bind(this);
        this.removeRecipient = this.removeRecipient.bind(this);
    }

    userQuery(input) {
        return (
            e => {
                this.setState({ [input]: e.target.value });
                this.props.searchFriends(e.target.value).then(users => { console.log("success"); });
            }
        );
    }

    update(input) {
        return (
            e => {
                this.setState({ [input]: e.target.value });
            }
        );
    }

    clearState() {
        this.setState({
            title: '',
            recipients: [],
            amount: '',
            date: '',
            numPeople: 0 });
    }

    handleSubmit(e) {
        e.preventDefault();
        const recipientIds = this.findRecipientIds(this.state.recipients);

        const expense = {
            recipients: recipientIds,
            title: this.state.title,
            amount: this.state.amount,
            expense_date: this.state.date
        };
        this.props.processExpenseForm(expense).then(
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

    findRecipientIds(recipients) {
        const friends = this.props.friends;
        const idArray = [];

        recipients.forEach((username) => {
            for (let user_key in friends) {
                let user = friends[user_key];
                if (user.username === username) {
                    idArray.push(user.id);
                }
            }

        });

        return idArray;
    }

    chooseUser(e) {
        const newRecipients = this.state.recipients.slice();
        e.preventDefault();
        const username = e.currentTarget.textContent.replace(/\s/g, '');
        newRecipients.push(username);
        this.setState({ recipients: newRecipients });
        this.setState({ username: "" });

        this.props.clearSearch();
    }

    removeRecipient(e) {
        e.preventDefault();
        const recipients = this.state.recipients.slice();
        const user = e.currentTarget.textContent.replace(/\s/g, '');
        const index = recipients.indexOf(user);
        recipients.splice(index, 1);
        this.setState({ recipients: recipients });
    }

    render() {

        const searchList = this.props.search.map((el, idx) => {
            if (!this.state.recipients.includes(el.username)) {
                return <li key={idx} onClick={this.chooseUser}> {el.username} </li>;
            }
        });

        const selectedUsers = this.state.recipients.map((el, idx) => {
            return <li className="expense-selected-users" key={idx} onClick={this.removeRecipient}>{el}<span id="remove-friend">x</span></li>;
        });

        const expenseErrors = this.props.errors.map((el, idx) => {
            return (
                <li key={`${idx}`}>{el}</li>
            );
        });

        let formContent;
        formContent = (
            <div className="add-expense-modal">
                <div id="create-an-expense">CREATE AN EXPENSE</div>
                <fieldset className="add-expense-form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <div className="expense-friends">
                                <span id="with-you-and">With you and:</span>
                                <span>{selectedUsers}</span>
                            </div>
                            <input type="text" id="expense-friends-input" value={this.state.username} placeholder="Enter username" onChange={this.userQuery('username')} />
                        </div>

                        <div className="expense-search-results">
                            <ul>
                                {searchList}
                            </ul>
                        </div>

                        <div className="expense-info">
                            <input type="text" value={this.state.title} placeholder="Enter title" onChange={this.update('title')} />

                            <input type="number" value={this.state.amount} placeholder="$0.00" onChange={this.update('amount')} />

                            <input type="date" value={this.state.date} onChange={this.update('date')} />
                        </div>
                        <br />
                        <div>
                            <input className="add-expense-button" type="submit" value="Save"></input>
                        </div>

                        <ul className="expense-errors">{expenseErrors}</ul>
                    </form>
                </fieldset>
                <br />
            </div>
        );

        return (
            <div>
                {formContent}
            </div>
        );
    }
};