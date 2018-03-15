import React, { Component } from 'react';
/*
Message can now be rendered using props passed from parent
NEXT STEP: update messages when the currentUser is changed in ChatPage
*/
class Message extends Component {
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };
  }

  createMessage = (content, i) => {
    if (content.fromMe === true)
      return (
        <div className="message toRight">
          <Message index={i} key={i}
            message={content.text}
            fromMe={content.fromMe}
          />
        </div>
      );
    else
      return (
        <div className="message">
          <Message index={i} key={i}
            message={content.text}
            fromMe={content.fromMe}
          />
        </div>
      );
  }

  render() {
    return (
      <div className="messageBox">
        {this.state.messages.map(this.createMessage)}
      </div>
    );
  }
}

export default MessageBox;