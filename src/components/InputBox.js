import React, { Component } from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

class InputBox extends Component {
  render() {
    return (
      <div className="inputBox">
        <Form>
          <TextArea autoHeight placeholder="Type your message here" />
          <Button icon><Icon name="send" /></Button>
        </Form>
      </div>
    )
  }
}

export default InputBox;