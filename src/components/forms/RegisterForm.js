import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class RegisterForm extends Component {
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
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  onSubmit(e) {
    // TODO: Enter key not submitting form?
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:8080/users/register', {
        email: this.state.data.email,
        username: this.state.data.username,
        password: this.state.data.password,
      }).then((res) => {
        console.log(res.data);
        if (res.status === 200)
          this.props.history.push('/login');
        else if (res.data['error'])
          console.log(res.data['error']);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  // TODO: Get URL in props so can reference in files down the chain.
  // TODO: Adequatly display server errors in FE.

  validate(data) {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.username) errors.username = 'Username required'; // TODO: Further username validations, length, is taken, etc.
    // TODO: Password validation required.
    if (!data.password) errors.password = "Can't be blank";
    if (!data.confirmP) errors.confirmP = "Can't be blank";
    if (data.confirmP !== data.password) errors.confirmP = "Passwords don't match.";
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h2>Register:</h2>
        <Form onSubmit={this.onSubmit}>
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
              placeholder="Make it secure"
              value={data.confirmP}
              onChange={this.onChange}
            />
            {errors.confirmP && <InlineError text={errors.confirmP} />}
          </Form.Field>
          <div className="navs">
            <Button secondary icon labelPosition="left">
              <Link to="/">
                <Icon name="chevron left" />
                Back
              </Link>
            </Button>
            <Button type="submit" primary>Register</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
