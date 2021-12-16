---
layout: default
title: Touchpad
parent: Controllers
---

## TouchPadSmartController extends SmartController
A class that supports touchpad. Touchpad objects are generated instead of base controller objects. 

**Create a Peer** 
```javascript
const simple_peer = new smartcontroller.TouchPadSmartController('id'); 
```

## TouchPad extends BaseController
Overrides the updateController function from BaseController to store current status, touchpad details and position change.

**Fields**  \\
 It has three extra fields:
 * isActive => true if joystick is currently in use 
 * state => 
 * finger_number => 

```javascript

touchpad.isActive // true if the user is currently interacting with the phone screen
touchpad.state //aln array of xy coordinates for each finger
touchpad.finger_number  //int number of fingers interacting with the screen 

```

**Example**
```javascript
    // make a JoystickSmartController object
    const simple_peer = new smartcontroller.TouchpadSmartController('id'); 

    //Check if the joystick is being interacted with
    if (simple_peer.controllerList[Object.keys(controllerList)[0]].isActive){
        // do something
    }
```


Try a demo here: link
Use the Touchpad controller for your project: link
