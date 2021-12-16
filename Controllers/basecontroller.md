---
layout: default
title: Base Controller
parent: Controllers
---

## BaseController
A base class for creating controllers. It is a default controller created in SmartCOntroller on connection unless a specific controller class is selected. 

### Methods

**Create a Peer** 
```javascript
const simple_peer = new smartcontroller.SmartController('id'); 
```

## Joystick extends BaseController
Overrides the updateController function from BaseController to store current status, joystick details and position change.

**Fields**  \\
 It has a single field:


```javascript
joystick.isActive // true if the user is currently interacting with the phone screen
```

**Example**
```javascript
    // make a JoystickSmartController object
    const simple_peer = new smartcontroller.JoystickSmartController('id'); 

    //Check if the joystick is being interacted with
    if (simple_peer.controllerList[Object.keys(controllerList)[0]].isActive){
        // do something
    }
```


Try a demo here: link
Use the Joystick controller for your project: link
