import React from 'react'
import ReactDom from 'react-dom'

class User extends React.Component {
  render() {
    return <li>User: {this.props.user.name}</li>
  }
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      completedInitialLoad: false
    };

    this.pollingInterval = false;

    // Functions with proper `this` binding

    this._addUser = (evt) => this.addUser(evt);
    this._onFetchUserSuccess = () => this.onFetchUserSuccess();
    this._fetchUsers = () => this.fetchUsers();
  }

  // REACT-SPECIFIC FUNCTIONS

  componentDidMount() {
    this._fetchUsers();

    const pollingInterval = setInterval(this._fetchUsers, 5000);
    this.pollingInterval = pollingInterval;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
    clearInterval(this.pollingInterval);
  }

  // CLASS UTILITY FUNCTIONS

  fetchUsers() {
    this.setState({
      isFetching: true,
    });
    console.log("Fetching users");
    setTimeout(this._onFetchUserSuccess, 1000);
  }

  onFetchUserSuccess() {
    const users = [
      {
        name: 'Rob',
      },
      {
        name: 'Rory',
      }
    ]

    this.setState({
      users,
      isFetching: false,
      completedInitialLoad: true,
    });
  }

  addUser(evt) {
    const updatedUsers = this.state.users.concat({ name: '(Ci|I|D)an' });
    this.setState({
      users: updatedUsers,
    });
  }

  // RENDER FUNCTIONS

  renderWithUsers() {
    return (
      <ul>
        { this.state.users.map((user, key) => <User user={user} key={key} />) }
      </ul>
    );
  }

  renderWithoutUsers() {
    if(this.state.isFetching || !this.state.completedInitialLoad) {
      return (
        <p>Fetching...</p>
      )
    }

    return (
      <p>There are no users</p>
    );
  }

  render() {
    return (
      <div className="user-list-container">
        { this.state.users.length > 0 ? this.renderWithUsers() : this.renderWithoutUsers() }
        <button type="button" onClick={this._addUser}>Add User</button>
      </div>
    )
  }
};

ReactDom.render(
  <div>
    <UserList />
  </div>,
  document.getElementById('app')
);