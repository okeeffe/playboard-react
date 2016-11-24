import React from 'react';
import Login from './user/login';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };

    this._onSuccessfulLogin = user => this._onSuccessfulLogin(user);
  };

  onSuccessfulLogin(user) {
    console.log(user);
    this.setState({
      currentUser: user,
    });
  }

  render() {
    return <Login currentUser={ this.state.currentUser } onSuccessfulLogin={ this._onSuccessfulLogin } />
  }
};

export default App;