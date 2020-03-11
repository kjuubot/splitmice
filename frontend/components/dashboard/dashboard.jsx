import React from 'react';
import FriendsContainer from '../friends/friends_container';
import { isEmpty } from 'lodash';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            youOweAmount: 0,
            youAreOwedAmount: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.updatePaymentState = this.updatePaymentState.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.router.push('/login'));
    }

    componentDidUpdate(prevProps) {
        if (this.props.expenses != prevProps.expenses) {
            this.updatePaymentState(this.props.expenses);
        }
    }

    updatePaymentState(info) {

        let youAreOwedAmountState = 0;
        Object.keys(info.you_are_owed).forEach((el) => {

            youAreOwedAmountState += info.you_are_owed[el];
        });

        let youOweState = 0;
        Object.keys(info.you_owe).forEach((el) => {

            youOweState += info.you_owe[el];
        });

        this.setState({ youOweAmount: youOweState });
        this.setState({ youAreOwedAmount: youAreOwedAmountState });
        this.setState({ balance: (youAreOwedAmountState - youOweState) });

    }

    render() {

        const youOweUsers = Object.keys(this.props.expenses.you_owe).map((user, idx) => {
            return (
                <li key={idx} className="user-transaction">
                    <div className="profile-pic"></div>
                    <div className="transaction-info-you-owe">
                        <div>{user}</div>
                        <div>you owe <strong>${this.props.expenses.you_owe[user].toFixed(2)}</strong></div>
                    </div>
                </li>
            );

        });

        const youAreOwedUsers = Object.keys(this.props.expenses.you_are_owed).map((user, idx) => {
            return (
                <li key={idx} className="user-transaction">
                    <div className="profile-pic"></div>
                    <div className="transaction-info-are-owed">
                        <div>{user}</div>
                        <div>owes you <strong>${this.props.expenses.you_are_owed[user].toFixed(2)}</strong></div>
                    </div>
                </li>
            );

        });

        return (
            <div>
                <div className="dashboard">

                    <div className="dashboard-sidebar">
                        <FriendsContainer />
                    </div>

                    <div className="dashboard-main">
                        <section className="dashboard-header">
                            <span>{this.props.currentUser.username}'s Dashboard</span>
                            <span className="dashboard-actions">
                                <button className="add-expense-button" onClick={() => this.props.openModal('addExpense')}>Add an Expense</button>
                                <button className="settle-up-button" onClick={() => this.props.openModal('settleUp')}>Settle Up</button>
                            </span>
                        </section>

                        <section className="dashboard-summary">
                            <div className="dashboard-balance">
                                <div className="balance-title">Total Balance:</div>
                                <div className={"amount " + (this.state.balance >= 0 ? "positive" : "negative")}>${this.state.balance.toFixed(2)}</div>
                            </div>

                            <div className="dashboard-owe">
                                <div className="owe-title">You Owe:</div>
                                <div className="amount-you-owe">${this.state.youOweAmount.toFixed(2)}</div>
                            </div>

                            <div className="dashboard-owed">
                                <div className="owed-title">You Are Owed:</div>
                                <div className="amount-you-are-owed">${this.state.youAreOwedAmount.toFixed(2)}</div>
                            </div>
                        </section>

                        <section className="dashboard-payments">
                            <div className="settled-up-status">
                                {isEmpty(this.props.expenses.you_owe) && isEmpty(this.props.expenses.you_are_owed) ? (
                                    <div>You're all settled up!</div>
                                ) : (
                                        <div>You have outstanding balances</div>
                                    )}
                            </div>
                            <div className="you-owe">
                                {isEmpty(this.props.expenses.you_owe) ? (
                                    <div>You're in the clear</div>
                                ) : (
                                        <ul>
                                            {youOweUsers}
                                        </ul>
                                    )}
                            </div>

                            <div className="you-are-owed">
                                {isEmpty(this.props.expenses.you_are_owed) ? (
                                    <div>You don't have any outstanding expenses</div>
                                ) : (
                                        <ul>
                                            {youAreOwedUsers}
                                        </ul>
                                    )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}