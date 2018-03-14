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
  constructor(props) {
    super(props);
    this.createContact.bind(this);
  }

  createContact(user, i) {
    return (
      <div>
        <Contact username={user} index={i} key={i}/>
      </div>
    );
  }

  render() {
    return (
      <div className="contactBox">
        {this.props.contacts.map(this.createContact)}
      </div>
    );
  }
}

export default ContactBox;