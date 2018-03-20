import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from '../messages/Message';

class MessageBox extends Component {
  createMessage(content, i) {
    if (content.fromMe === true) {
      return (
        <div className="message toRight">
          <Message
            index={i}
            key={i}
            message={content.text}
            fromMe={content.fromMe}
          />
        </div>
      );
    }
    return (
      <div className="message">
        <Message
          index={i}
          key={i}
          message={content.text}
          fromMe={content.fromMe}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="messageBox">
        {this.props.messages.map(this.createMessage)}
      </div>
    );
  }
}

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default MessageBox;
