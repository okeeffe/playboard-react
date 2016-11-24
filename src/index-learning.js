import React from 'react';
import ReactDom from 'react-dom';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      completedInitialLoad: false,
      isCreatingUser: false,
      selectedUser: null,
    };

    this.pollingInterval = false;

    // Functions with proper `this` binding

    this._addUser = (name, cback) => this.addUser(name, cback);
    this._onFetchUserSuccess = () => this.onFetchUserSuccess();
    this._fetchUsers = () => this.fetchUsers();
    this._onUserSelected = user => this.onUserSelected(user);
    this._changeUserProperty = (name, property, value) => this.changeUserProperty(name, property, value);
  };

  // REACT-SPECIFIC FUNCTIONS

  componentDidMount() {
    this.fetchUsers();

    // const pollingInterval = setInterval(this._fetchUsers, 5000);
    // this.pollingInterval = pollingInterval;
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextState.users, this.state.users);
  };

  componentDidUpdate(prevProps, prevState) {

  };

  componentWillUnmount() {
    clearInterval(this.pollingInterval);
  };

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
      isCreatingUser: false,
    });
  };

  addUser(name, cback) {
    this.setState({
      isCreatingUser: true,
    });

    setTimeout(() => {
      const updatedUsers = this.state.users.concat({ name })
      this.setState({
        users: updatedUsers,
        isCreatingUser: false,
      });
      if(cback) {
        cback();
      }
    }, 1000);
  };

  onUserSelected(user) {
    const selectedUser = (this.state.selectedUser === user) ? null : user;
    this.setState({
      selectedUser: selectedUser,
    })
  };

  changeUserProperty(user, property, value) {
    const updatedUser = { ...user, [property]: value };
    const updatedUsers = [...this.state.users];
    updatedUsers.splice(this.state.users.indexOf(user), 1, updatedUser);

    if(user === this.state.selectedUser) {
      this.setState({
        users: updatedUsers,
        selectedUser: updatedUser,
      });
    } else {
      this.setState({
        users: updatedUsers,
      });
    }
  };

  render() {
    return (
      <div>
        <UserList users={ this.state.users } selectedUser={ this.state.selectedUser } isFetching={ this.state.isFetching } completedInitialLoad={ this.state.completedInitialLoad } onUserSelected={ this._onUserSelected } />
        <UserEditor onChangeUserProperty={ this._changeUserProperty } user={ this.state.selectedUser } />
        <UserCreator onClickAddUser={ this._addUser } isCreatingUser={ this.state.isCreatingUser } />
      </div>
    )
  };
};

class UserCreator extends React.Component {
  constructor(props) {
    super(props);

    this._addUser = evt => this.addUser(evt);
    this._clearName = () => this.clearName();
  };

  clearName() {
    this.userNameField.value = "";
  };

  addUser(evt) {
    evt.preventDefault();

    let nameInput = this.userNameField;
    const name = nameInput.value.trim();

    if(name.length > 0) {
      this.props.onClickAddUser(name, this._clearName);
    } else {
      alert("We don't want no scrubs");
    }
  };

  render() {
    return (
      <form onSubmit={ this._addUser }>
        <input type="text" placeholder="New user name" ref={ ref => this.userNameField = ref } />
        <button type="submit" disabled={ this.props.isCreatingUser }>Add User</button>
      </form>
    );
  };
}

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    if(this.props.user) {
      return <input type="text" value={ this.props.user.name } onChange={ evt => this.props.onChangeUserProperty(this.props.user, 'name', evt.target.value) } />
    }

    return <p>No user selected</p>;
  };
}

class User extends React.Component {
  constructor(props) {
    super(props);

    this._onUserSelected = (evt) => this.onUserSelected(evt);
  };

  onUserSelected(evt) {
    this.props.onUserSelected(this.props.user);
  };

  render() {
    return <div onClick={ this._onUserSelected }>User: { this.props.user.name } { this.props.selected ? "SELECTED" : "" }</div>;
  };
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this._onUserSelected = user => this.onUserSelected(user);
  };

  onUserSelected(user) {
    this.props.onUserSelected(user);
  };

  // RENDER FUNCTIONS

  renderWithUsers() {
    return (
      <ul>
        { this.props.users.map((user, key) => <li key={ key }><User user={ user } onUserSelected={ this._onUserSelected } selected={ this.props.selectedUser === user }/></li>) }
      </ul>
    );
  };

  renderWithoutUsers() {
    if(this.props.isFetching || !this.props.completedInitialLoad) {
      return (
        <p>Fetching...</p>
      )
    }

    return (
      <p>There are no users</p>
    );
  }

  render() {
    return this.props.users.length > 0 ? this.renderWithUsers() : this.renderWithoutUsers();
  };
};

ReactDom.render(
  <Users />,
  document.getElementById('app')
);