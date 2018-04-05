import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Contact from '../messages/Contact';

class ContactBox extends Component {
  constructor(props) {
    super(props);
    this.getUserLastMessage = this.getUserLastMessage.bind(this);
  }

  getUserLastMessage(user) {
    let msg = this.props.getUserMessage(user);
    let lastMsg = msg[msg.length - 1].text;
    return (lastMsg);
  }

  render() {
    return (
      <div className="contactBox">
        {this.props.contacts.map(user => (
          <Contact
            username={user}
            updateUser={this.props.updateUser}
            lastMessage={this.getUserLastMessage(user)}
          />
        ))}
      </div>
    );
  }
}

ContactBox.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
  updateUser: PropTypes.func,
  lastMessage: PropTypes.func,
};

export default ContactBox;
