---
layout: default
title: Smart Controller
nav_order: 3
---

## SmartController



**Create a Peer** 
```javascript
const peer = new smartcontroller.SmartController('id', firstConnected = true, controllerInterface = BaseController); 
// parameters are optional:
// ID: if id isn't provided a random one will be created
//firstConnected decides how to handle multiple connections of the same player id
// controllerInterface decides what type of controller is generated 
```


**Create a QRcode** \
Make a qr code and display it on the screen. The url is the link to where the phone controller is hosted. The div element takes an ID of a div and displays the qr code. PlayerID can be set to distinguish between connections. 
```javascript
peer.createQrCode(url, div element id, width = 256, height = 256, playerID = null);
//select from premade controllers by specifying a type (joystick, touchscreen, nes controller) or provide a url for your own controller
//canvas element for the qr code to be displayed
```

### Fields

* peerConnection - creates a peerjs object for the browser that will allow for the smartphones to connect and will process the incoming data. The peer id will be random unless specified in the constructor
* remotePeers - to be removed
* controllerList - a dictionary of controllers, one controller is created per user connected. The value is mapped to the peer ID of the smartphone if no playerID is specified in the QRcode, otherwise the controller is mapped to set player ID. 

### Events

**Register a new event**

The basic event syntax: 

```javascript
peer.on(flag, function);
//Flag: specify when the function should be called (connection, data, close)
//Function: pass a function to be called
```

**Types of flags** 

* connection : will pass a peer object of player who just connected to the function 

```javascript
  // listen for a connection and print the peer id of the new connection in the console
  simple_peer.on('connection', function(data){
    console.log(data.peer)
  })
```


* data : will pass a user id and input from the phone. Unless specific controller is selected (joystick, touchpad ...) the data is dicarded aferwards

```javascript
  // listen for new data and print it in the console
  simple_peer.on('data', function(data){
    console.log(data.id) //print peer id of the user who sent the message
    console.log(data.data) //print the message contents
  })
```

* close : will pass a peer id of player who just disconnected. The user is deleted from the controllerList


```javascript
  // listen for a disconnect and print the peer id of the disconnected player in the console
  simple_peer.on('close', function(data){
    console.log(data)
  })
```







