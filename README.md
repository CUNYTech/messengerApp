# Messanger Outline

(much more coming soon, I'm still figuring out how best to format this in markdown)

## Splash Page
 ### Login
 This page will contain the login and a place to register. When register the account will be assigned a private key. I think we should    also offer a way to not register and just search into a chat.

## Chat Loader Page
   ### Create Chat Button
   Clicking this button will create a new "wallet". I use the term wallet solely because it's the term used in blockchain/iota to classify    the place in which your private key is stored. However, in our version we won't be having a private wallet, instead a wallet will be a    text conversation accessible by anyone with the private key for the conversation. Clicking this button will move you onto the chat demo    page in which the chat box and hash box will be blank.
   
   ### Search Box
   Here is where you'd enter the private key given to you by another to join a chat. Upon entering it it would take you to a chat demo        page already populated by past messages.

## Chat Demo Page
   ### Chat Box
   This will be a typical run of the mill chat box. A place to type, you hit enter and a time stamped message enters the box. It could        have your registered name or be annonymous 
   
   ### Hash Box
   When a message is entered you will see a corrosponding cryptography hash appear in the hash box, this will be for demonstrational          purposes to show what's happening on the back end of the chat. After a set amount of time the hashes will clear and will be bundled        into a   single hash that will enter the chain.
   
   ### Chain Box
   Here you will see the chain growing by a block/bundle after every set amount of time and the hashes from the hash box are written to      the chain.
   
## Additional things we could add
   - A way to delete messages before they are written to the chain.
   - A spot that a person with a registered account can see all the private keys of the chats they are in.
   - Investigate a way to use the time stamp as a way so that a private key can be shared that only shows part of a conversation, as if      you wanted to share only a day of chat but not your entire conversation. 
   - Demoing some sort of smart contract connection if there is time.

