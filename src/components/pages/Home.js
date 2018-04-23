import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    };
  }

  updateLoginStatus() {
    this.setState({
      login: !this.state.login
    });
  }

  render() {
    if (this.state.login === true) {
      console.log("logged in");
      return (
        <Redirect to="/chatpage" />
      );
    } else {
        return (
          <div className="buttonBox">
            <Link to="/login">
              <button
                name="login"
                className="medium ui button"
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                name="register"
                className="medium ui button"
              >
                Register
              </button>
            </Link>
          </div>
        );
    }
  }
}

export default Home;
