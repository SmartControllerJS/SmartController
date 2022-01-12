---
layout: default
title: Base Controller
parent: Controllers
---

## BaseController
A base class for creating controllers. It is a default controller created in SmartController on connection unless a specific controller class is selected. 

### Methods

**Create a Peer** 
```javascript
const simple_peer = new smartcontroller.SmartController('id', playerID = null); 
```

## Joystick extends BaseController
Overrides the updateController function from BaseController to store current status, joystick details and position change.

**Fields**  \\
 It has two field:
 * peer - stores the Peerjs object of the smartphone
 * playerID - if a player ID was specified in the QR code it will be mapped to a controller, otherwise null


**Example**
```javascript
    // make a SmartController object
    const simple_peer = new smartcontroller.SmartController('id'); 

    //Check the ID of the controller
    for (var controller in simple_peer.controllerList){
        console.log(controller.playerID)
    }
```
