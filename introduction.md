---
layout: default
title: Getting Started
nav_order: 2
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




## RemoteTouchPad
Adds fields, methods and callback options specific to touchscreen input \
Extends SmartPeer

**Create a Peer** 
```javascript
const touchpad_peer = new TouchPadSmartController('id'); 
```

**Fields** 
```javascript
touchpad_peer.touchpadList
//list of Touchpad objects, 1 object per player
```

**Methods** 
(not yet implemented)
```javascript
touchpad_peer.recognizeGesture();
// recognizeGesture will take the current finger_postion and tries to match it to one of the available gestures
```

## Touchpad class
Each player has their own touchpad object

**Fields** 
```javascript
touchpad.connecion // peer id
touchpad.isActive // true if the user is currently interacting with the phone screen
touchpad.state //coordinates for each finger, can't tell finger appart coordinates are recorded in order of tapping the screen
touchpad.figer_number //number of fingers touching the screen
```






## RemoteJoystick
Adds fields, methods and callback options specific to joystick input \
Extends SmartPeer

**Create a Peer** 
```javascript
const joystick_peer = new JoystickSmartController('id'); 
```

**Fields** 
```javascript
joystick_peer.joystickList 
//list of Joystick objects, 1 object per player
```

## Joystick class
Each player has their own joystick object

**Fields** 
```javascript
joystick.connecion // peer id
joystick.isActive // true if the user is currently interacting with the phone screen
joystick.state //all information sent from joystick [angle, direction, distance, position coordinates]
joystick.positionChange = {x:0, y:0} //shows by how much the position changed 
```



## RemoteNesController
Adds fields, methods and callback options specific to buttons on nes controller input \
Extends SmartPeer

**Create a Peer** 
```javascript
const controller_peer = new NesSmartController('id'); 
```

**Fields** 
```javascript
controller_peer.controllerList 
//list of NesController objects, 1 object per player
```

## NesController class
Each player has their own controller object

**Fields** 
```javascript
controller.connecion // peer id
controller.buttons = {up:false, down:false, right:false, left:false, start:false, select:false, a:false, b:false}; //dictionary of buttons, true if currently pressed
```





## Mobile browser

**Create a Peer** 
```javascript
const peer = new SmartPhoneController(); 
//will automatically create a connection with the PC peer id in url
```

**Send a message to a peer**
```javascript
peer.connection.send(data);
//send any user input data in the following format {type: 'user', data: data} to be recognized by the PC browser
```

