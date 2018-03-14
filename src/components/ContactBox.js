import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        {this.props.username}
      </div>
    );
  }
}

class ContactBox extends Component {
  render() {
    return (
      <div className="contactBox">
        <Contact username="AAA" />
        <Contact username="BBB" />
        <Contact username="CCC" />
      </div>
    );
  }
}

export default ContactBox;