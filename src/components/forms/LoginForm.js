import React from 'react';
import axios from 'axios';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: '',
      },
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

  onSubmit() {
    console.log('submitted');
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:8080/users/login', {
        email: this.state.data.email,
        password: this.state.data.password,
      }).then((res) => {
        console.log(res.data);
        if (res.status === 200)
          this.props.history.push('/chatpage');
        else if (res.data['error'])
          console.log(res.data['error']);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  validate(data) {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h3>Login:</h3>
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
          <div className="navs">
          <Button secondary icon labelPosition="left">
            <Link to="/">
              <Icon name="chevron left" />
              Back
            </Link>
          </Button>
          <Form.Button type="submit" primary>
          <Link to="/chatpage">
            Login
          </Link>
          </Form.Button>

          </div>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
