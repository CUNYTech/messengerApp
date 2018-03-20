import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import '../../style/ChatPage.css';
import MessageBox from '../MessageBox';
import ContactBox from '../ContactBox';
import InputBox from '../InputBox';
import sampleMsg from '../sampleMessages.json';

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      contacts: sampleMsg.map((content) => content.user),
      currentUser: sampleMsg[0].user,
      currentMessages: this.getMessage(sampleMsg[0].user)
    };
  }

  // function to get message array according to username
  getMessage(username) {
    let arr;
    let i;
    for (i = 0; i < sampleMsg.length; i++) {
      if (sampleMsg[i].user === username) {
        arr = sampleMsg[i].messages
      }
    }
    return (arr);
  }

  // handler to update user and get messages when the button in contactBox is clicked
  updateCurrentUser(user) {
    this.setState({
      currentUser: user,
      currentMessages: this.getMessage(user)
    });
  }

  addNewMessage(newText, newFromMe) {
    let arr = this.state.currentMessages;
    let newMessage = {
      text: newText,
      fromMe: newFromMe
    };
    arr.push(newMessage);
    this.setState({
      currentMessages: arr
    });
  }

  render() {
    return (
      <div className="main">
        <header>
          <Link to="/">
            <Button icon><Icon name="power" /></Button>
          </Link>
          <div className="chatHeader">{this.state.currentUser}</div>
        </header>
        <ContactBox contacts={this.state.contacts} updateUser={this.updateCurrentUser}/>
        <MessageBox messages={this.state.currentMessages} />
        <InputBox handleSend={this.addNewMessage} />
      </div>
    );
  }
}

export default ChatPage;