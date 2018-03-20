import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
