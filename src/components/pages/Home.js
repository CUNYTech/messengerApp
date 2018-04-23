import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
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

export default Home;
