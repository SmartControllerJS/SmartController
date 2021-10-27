# SmartController: Peer-to-peer for creating smartphone controllers #

SmartController provides an easy way of turning a smartphone into versatile controller.


## Getting started 

**Include the library**

  install NPM package:
        `npm install smartcontroller`
        
  ```js
  // The usage -
  import SmartController from 'smartcontroller';
  ```

## PC browser

**Create a Peer** 
```javascript
const peer = new SmartController('id'); 
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
*connection* : will pass a number of player who just connected to your function \
*data* : will pass a player number and the input from the phone \
*close* : will pass a number of player who just disconnected 

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
const touchpad_peer = new TouchPadSmartPeer('id'); 
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

## Touchapad class
Each player has their own touchpad object

**Fields** 
```javascript
touchpad.connecion // peer id
touchpad.isActive // true if the user is currently intercating with the phone screen
touchpad.state //coordinates for each finger, cant tell finger appart coordinates are recorded in order of tapping the screen
touchpad.figer_number //number of fingers touching the screen
```


## RemoteJoystick
Adds fields, methods and callback options specific to joystick input \
Extends SmartPeer

**Create a Peer** 
```javascript
const joystick_peer = new JoystickSmartPeer('id'); 
```

**Fields** 
```javascript
joystick_peer.joystickList 
//list of Touchpad objects, 1 object per player
```

## Joystick class
Each player has their own joystick object

**Fields** 
```javascript
touchpad.connecion // peer id
touchpad.isActive // true if the user is currently interacting with the phone screen
touchpad.state //all information sent from joystick [angle, direction, distance, position coordinates]
touchpad.lastPosition = {x:0, y:0} //last position on pc screen 
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

