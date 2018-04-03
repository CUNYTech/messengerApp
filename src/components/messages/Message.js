import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  constructor(props) {
    super(props);
    this.getDate = this.getDate.bind(this);
  }

  getDate() {
    let date = new Date(this.props.time * 1000);
    let hour = date.getHours();
    let minute = "0" + date.getMinutes();
    let second = "0" + date.getSeconds();
    let dateStr = hour + ":" + minute.substr(-2) + ":" + second.substr(-2);
    return (dateStr);
  }

  render() {
    return (
      <div>
        <div className="text">
          {this.props.message}
        </div>
        <div className="time">
          {this.getDate()}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string,
  time: PropTypes.number,
};

export default Message;
