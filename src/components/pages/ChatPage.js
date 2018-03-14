import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import '../../style/ChatPage.css';
import MessageBox from '../MessageBox';
import ContactBox from '../ContactBox';
import InputBox from '../InputBox';

class ChatPage extends Component {
  render() {
    return (
      <div className="main">
        <header>
          <Link to="/">
            <Button icon><Icon name="power" /></Button>
          </Link>
          <div className="chatHeader">Name</div>
        </header>
        <ContactBox />
        <MessageBox />
        <InputBox />
      </div>
    );
  }
}

export default ChatPage;