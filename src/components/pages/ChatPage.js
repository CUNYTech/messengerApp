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

  getMessage = (username) => {
    let arr;
    let i;
    for (i = 0; i < sampleMsg.length; i++) {
      if (sampleMsg[i].user === username) {
        arr = sampleMsg[i].messages
      }
    }
    return (arr);
  }

  updateCurrentUser = (user) => {
    this.setState({
      currentUser: user
    });
  }
/* NOT WORKING YET
  updateCurrentMessage = () => {
    let arr = this.getMessage(this.currentUser);
    this.setState({
      currentMessages: arr
    });
    console.log(this.state.currentMessages);
  }
*/
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
        <InputBox />
      </div>
    );
  }
}

export default ChatPage;