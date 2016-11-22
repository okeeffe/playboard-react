import React from 'react'
import ReactDom from 'react-dom'

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
    this._onUserSelected = (user) => this.onUserSelected(user);
  }

  // REACT-SPECIFIC FUNCTIONS

  componentDidMount() {
    this.fetchUsers();

    // const pollingInterval = setInterval(this._fetchUsers, 5000);
    // this.pollingInterval = pollingInterval;
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
      isCreatingUser: false,
    });
  }

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
  }

  onUserSelected(user) {
    const selectedUser = this.state.selectedUser && user.name === this.state.selectedUser.name ? null : user;
    this.setState({
      selectedUser: selectedUser,
    })
  }

  render() {
    return (
      <div>
        <UserList users={ this.state.users } selectedUser={ this.state.selectedUser } isFetching={ this.state.isFetching } completedInitialLoad={ this.state.completedInitialLoad } onUserSelected={ this._onUserSelected } />
        <UserCreator onClickAddUser={ this._addUser } isCreatingUser={ this.state.isCreatingUser } />
      </div>
    )
  };
};

class UserCreator extends React.Component {
  constructor(props) {
    super(props);

    this._addUser = (evt) => this.addUser(evt);
    this._clearName = () => this.clearName();
  }

  clearName() {
    this.userNameField.value = "";
  }

  addUser(evt) {
    evt.preventDefault();

    let nameInput = this.userNameField;
    const name = nameInput.value.trim();

    if(name.length > 0) {
      this.props.onClickAddUser(name, this._clearName);
    } else {
      alert("We don't want no scrubs");
    }
  }

  render() {
    return (
      <form onSubmit={ this._addUser }>
        <input type="text" ref={ ref => this.userNameField = ref } />
        <button type="submit" disabled={ this.props.isCreatingUser }>Add User</button>
      </form>
    );
  };
}

class User extends React.Component {
  constructor(props) {
    super(props);

    this._onUserSelected = (evt) => this.onUserSelected(evt);
  }

  onUserSelected(evt) {
    this.props.onUserSelected(this.props.user);
  }

  render() {
    return <li onClick={ this._onUserSelected }>User: { this.props.user.name } { this.props.selected ? "SELECTED" : "" }</li>
  };
};

// Stateless functional component version of user
const StatelessUser = ({ user, selected, onUserSelected  }) => {
  return (
    <div onClick={evt => onUserSelected(user)}>
      { `${user.name} ${selected ? " SELECTED" : ''}` };
    </div>
  )
}

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this._onUserSelected = (user) => this.onUserSelected(user);
  }

  onUserSelected(user) {
    this.props.onUserSelected(user);
  }

  // RENDER FUNCTIONS

  renderWithUsers() {
    return (
      <ul>
        { this.props.users.map((user, key) => <User user={ user } key={ key } onUserSelected={ this._onUserSelected } selected={ this.props.selectedUser && this.props.selectedUser.name === user.name }/>) }
      </ul>
    );
  }

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