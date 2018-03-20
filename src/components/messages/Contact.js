import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.updateUser(this.props.username);
  }

  render() {
    return (
      <div className="contact">
        <Button basic compact onClick={this.handleUpdate}>
          {this.props.username}
        </Button>
      </div>
    );
  }
}

Contact.propTypes = {
  updateUser: PropTypes.func,
  username: PropTypes.string,
};

export default Contact;
