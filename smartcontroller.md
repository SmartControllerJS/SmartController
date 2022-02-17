---
layout: default
title: Smart Controller
nav_order: 3
---

## SmartController

**Create a Peer** <br>
Every page needs a smartcontroller object to manage the peer connections.

#### Arguments

- peer ID - you may specify the browser peer ID as a string
- firstConnected - true by default, if multiple players scan a QR code with the same player ID only the first connection will be kept, if false then every new connection to that player ID will disconnect the previous one
- stats - true by default, will calculate ping for each controller if enabled
- controllerInterface - creates a specific controller object

| ⚠️ WARNING: If a peer ID is specified, only a single browser tab will work. There cannot be multiple peers with the same ID therefore, if there are multiple tabs with the same peer open only one the first one will display the QR code and be open to connections. ⚠️ |

```javascript
const peer = new smartcontroller.SmartController(
  "id",
  (firstConnected = true),
  (controllerInterface = BaseController)
);
// parameters are optional:
// ID: if id isn't provided a random one will be created
//firstConnected decides how to handle multiple connections of the same player id
// stats: sends stats messages between browser and controller to calculate ping
// controllerInterface decides what type of controller is generated
```

**Create a QRcode** <br>

Make a qr code and display it on the screen.

#### Arguments

- url - link to the phone controller page, make your own or choose one of the premade ones <a href ='https://github.com/SmartControllerJS/Controllers'>here</a>
- div element - takes an ID of a div to display the qr code
- PlayerID - can be set to distinguish between connections, if specified it will be used as a key in the controllerList
- width, height - specify the size of the QR code
- message throttle - message from a phone controller will be sent every n milliseconds. If not 0, some of the messages will be skipped, only suitable for controllers with high user data output.

```javascript
peer.createQrCode(url, div element id, width = 256, height = 256, playerID = null, throttle = 0);
//select from premade controllers or provide a url for your own controller
//canvas element for the qr code to be displayed
```

### Fields

- peerConnection - creates a peerjs object for the browser that will allow for the smartphones to connect and will process the incoming data. The peer id will be random unless specified in the constructor
- remotePeers - to be removed
- controllerList - a dictionary of controllers, one controller is created per user connected. The value is mapped to the peer ID of the smartphone if no playerID is specified in the QRcode, otherwise the controller is mapped to set player ID.

### Events

**Register a new event**

The basic event syntax:

```javascript
peer.on(flag, function);
//Flag: specify when the function should be called (connection, data, close)
//Function: pass a function to be called
```

**Types of flags**

- connection : will pass a peer object of player who just connected to the function

```javascript
// listen for a connection and print the peer id of the new connection in the console
simple_peer.on("connection", function (data) {
  console.log(data.peer);
});
```

- data : will pass a user id and input from the phone. Unless specific controller is selected (joystick, touchpad ...) the data is dicarded aferwards

```javascript
// listen for new data and print it in the console
simple_peer.on("data", function (data) {
  console.log(data.id); //print peer id of the user who sent the message
  console.log(data.data); //print the message contents
});
```

- close : will pass a peer id of player who just disconnected. The user is deleted from the controllerList

```javascript
// listen for a disconnect and print the peer id of the disconnected player in the console
simple_peer.on("close", function (data) {
  console.log(data);
});
```
