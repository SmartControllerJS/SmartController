---
layout: post
title:  "Smart controller"
categories: jekyll update
---

# SmartController: Peer-to-peer for creating smartphone controllers #

SmartController provides an easy way of turning a smartphone into versatile controller.


## Getting started 

**Include the library**

  install NPM package:
        `npm install smartcontroller`
        
  ```js
  // The usage -
  import 'smartcontroller';
  ```

## PC browser

**Create a Peer** 
```javascript
const peer = new smartcontroller.SmartController('id'); 
// parameters are optional:
// ID: if id isn't provided a random one will be created
```


**Create a QRcode** \
Make a qr code for easy phone connection
```javascript
peer.createQrCode(url, div element id, width = 256, height = 256, playerID = null);
//select from premade controllers by specifying a type (joystick, touchscreen, nes controller) or provide a url for your own controller
//canvas element for the qr code to be displayed
```

## Events

**Register a new event**

```javascript
peer.on(flag, function);
//Flag: specify when the function should be called (connection, data, close)
//Function: pass a function to be called
```

**Types of callbacks** \
*connection* : will pass a peer object of player who just connected to your function \
*data* : will pass a peer id and the input from the phone \
*close* : will pass a peer id of player who just disconnected 

## Connection 

**Display stats** 
(not yet implemented)
```javascript
peer.getStats(type, DomElement)
//Specify type of stats you wish to display (latency, update frequency...) and an html element to display them
```

**Fields**
```javascript
peer.remotePeers
// list of currecntly connected users

peer.peerConnection 
//peer object
```


