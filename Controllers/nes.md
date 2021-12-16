---
layout: default
title: Nes Controller
parent: Controllers
---

## JoystickSmartController extends SmartController
A class that supports joystick. Joystick objects are generated instead of base controller objects. 

**Create a Peer** 
```javascript
const simple_peer = new smartcontroller.JoystickSmartController('id'); 
```

## Joystick extends BaseController
Overrides the updateController function from BaseController to store current status, joystick details and position change.

**Fields**  \\
 It has three extra fields:
 * isActive => true if joystick is currently in use 
 * state => a dictionary of information: angle, direction, distance, position coordinates
 * positionChange => calculates a change in x and y coordinates from previous state

```javascript

joystick.isActive // true if the user is currently interacting with the phone screen
joystick.state //all information sent from joystick [angle, direction, distance, position coordinates]
joystick.positionChange = {x:0, y:0} //shows by how much the position changed in x and y 

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
