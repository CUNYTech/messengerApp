import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="text">
          {this.props.message}
        </div>
        <div className="time">
          {this.props.time}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
