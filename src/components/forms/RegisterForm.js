import React from 'react';
// import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        confirmP: '',
      },
      confirmPErr: false,
      loading: false,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  onSubmit() {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // TODO: This is where you'll use axios to post the data to the API.
      console.log(this.state.data);
    }
  }

  validate(data) {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.username) errors.username = "Username required"; // TODO: Further username validations, length, is taken, etc.
    if (!data.password) errors.password = "Can't be blank";
    if (data.confirmP !== data.password) errors.confirmP = "Passwords don't match.";
    return errors;
  }

  focusHandler() {
    if (this.state.confirmPErr) this.setState({ confirmPErr: false });
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h2>Register:</h2>
        <Form onSubmit={this.onSubmit}>
        <h2 className="formHead">Register</h2>
          <Form.Field className="formBody" error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field className="formBody" error={!!errors.username}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={this.onChange}
            />
            {errors.username && <InlineError text={errors.username} />}
          </Form.Field>
          <Form.Field className="formBody" error={!!errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Make it secure"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Form.Field className="formBody" error={!!errors.confirmP}>
            <label htmlFor="confirmP">Enter Password Again</label>
            <input
              type="password"
              id="confirmP"
              name="confirmP"
              onFocus={this.focusHandler}
              placeholder="Make it secure"
              value={data.confirmP}
              onChange={this.onChange}
            />
            {errors.confirmP && <InlineError text={errors.confirmP} />}
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
