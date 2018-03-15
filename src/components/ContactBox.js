import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Contact extends Component {
  handleUpdate = () => {
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

class ContactBox extends Component {
  render() {
    return (
      <div className="contactBox">
        {this.props.contacts.map((user, i) => {
          return (
            <div>
              <Contact username={user} index={i} key={i} updateUser={this.props.updateUser} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ContactBox;