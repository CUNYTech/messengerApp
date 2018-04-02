import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Contact from '../messages/Contact';

class ContactBox extends Component {
  render() {
    return (
      <div className="contactBox">
        {this.props.contacts.map(user => (
          <Contact
            username={user}
            updateUser={this.props.updateUser}
          />
        ))}
      </div>
    );
  }
}

ContactBox.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
  updateUser: PropTypes.func,
};

export default ContactBox;
