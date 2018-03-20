import React, { Component } from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  handleSubmit() {
    if (this.state.inputText) { // send only if the string is not empty
      this.setState({
        inputText: '',
      });
      this.props.handleSend(this.state.inputText, true);
    }
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value,
    });
  }

  render() {
    return (
      <div className="inputBox">
        <Form>
          <TextArea
            autoHeight
            placeholder="Type your message here"
            onChange={this.handleChange}
            value={this.state.inputText}
          />
          <Button icon onClick={this.handleSubmit}><Icon name="send" /></Button>
        </Form>
      </div>
    );
  }
}

InputBox.propTypes = {
  handleSend: PropTypes.func,
};

export default InputBox;