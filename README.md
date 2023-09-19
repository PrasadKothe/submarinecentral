
## Program: Management of submarines in an ocean

## Technology : Javascript,PubNub, Jquery, Bootstrap, NodeJS

## Task Description

The control room controls all the submarines. For this, it manages the location of all the ships and sends commands to hide itself during a war. When there is no threat (again sent by the control room), they come back again to the surface. Jack Sparrow (control room's head) decides when for the submarine to come back.

You are consulted to write a program to help Jack sparrow. There are 2 web pages - Control room and Submarines.

One web page - Jack Sparrow's Control Room

- Understand Pubnub. You can register for free. Basically, its a communication platform where clients can listen on a channel and other clients can send or receive updates.
- Write client code that listens for submarines to register. You can use PubNub to listen on a channel and sniff for join and leave events.
- Check if the name is already taken while a submarine registers in the backbone list. The client should be sent an error to reregister with a proper name. Otherwise, it should be added to the list (backbone)
- For each submarine registered, it should show hide button which when clicked will send a message to the submarine to hide
- If a submarine hides, it should be disabled from the list.

Second Web page for submarines
- Submarines (new web pages) can register with Jack Sparrow. The web page should take the name of the ship (as alphanumeric input with proper validation) and the register option. If the name is already registered with Jack Sparrow, Jack Sparrow sends an invalid signal. You should show an error.
- Show the status of the submarine (default is shown). When it receives a command from the server, it hides by updating the status.
- Submarines can also hide while it is undergoing maintenance. A button to hide should be shown. It will then be removed from Jack Sparrow's list.

## Steps to Run the Application
To run this project yourself you will need a PubNub account

### Requirements
- [Node.js](https://nodejs.org/en/)
- [PubNub Account](#pubnub-account) (*Free*) , API Keys are needed



