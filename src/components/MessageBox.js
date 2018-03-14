import React, { Component } from 'react';

class Message extends Component {
  render() {
    if (this.props.fromMe === true) {
      return (
        <div className="message toRight">
          {this.props.children}
        </div>
      );
    }
    else {
      return (
        <div className="message">
          {this.props.children}
        </div>
      );
    }
  }
}

class MessageBox extends Component {
  render() {
    return (
      <div className="messageBox">
        <Message fromMe={true}>I sent this message</Message>      
        <Message fromMe={false}>Someone sent me this message</Message>  
      </div>
    );
  }
}

export default MessageBox;