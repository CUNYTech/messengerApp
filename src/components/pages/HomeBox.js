import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

class HomeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    this.setState({ mode: e.target.name });
  }

  render() {
    // Logic here for diff components.
    switch (this.state.mode) {
      case 'login':
        return <LoginForm />; // Figure this out with React Router to rewrite URL etc.
      case 'register':
        return <RegisterForm />;
      default:
        return (
          <div className="buttonBox">
            <button
              onClick={this.clickHandler}
              name="login"
              className="medium ui button"
            >
              Login
            </button>
            <button
              onClick={this.clickHandler}
              name="register"
              className="medium ui button"
            >
              Register
            </button>
          </div>
        );
    }
  }
}

export default HomeBox;
