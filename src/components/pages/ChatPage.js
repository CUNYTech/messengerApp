import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import '../../style/ChatPage.css';
import MessageBox from '../MessageBox';
import ContactBox from '../ContactBox';
import InputBox from '../InputBox';

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      contacts: ["AAA", "BBB", "CCC"] // should get this from server(?)
    };
  }

  render() {
    return (
      <div className="main">
        <header>
          <Link to="/">
            <Button icon><Icon name="power" /></Button>
          </Link>
          <div className="chatHeader">Name</div>
        </header>
        <ContactBox contacts={this.state.contacts} />
        <MessageBox />
        <InputBox />
      </div>
    );
  }
}

export default ChatPage;