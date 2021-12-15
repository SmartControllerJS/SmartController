---
layout: post
title:  "Other Controllers"
categories: jekyll update
---

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

