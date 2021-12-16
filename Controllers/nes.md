---
layout: default
title: Nes Controller
parent: Controllers
---

## NesSmartController extends SmartController
A class that supports Nes controller. Nes controlelr bjects are generated instead of base controller objects. 

**Create a Peer** 
```javascript
const simple_peer = new smartcontroller.NesSmartController('id'); 
```

## NesController extends BaseController
Overrides the updateController function from BaseController to store buttons and their states.

**Fields**  \\
 It has one extra fields:
 * buttons => dictionary of vailable buttons, the value is true if pressed: up, down, right, left, start, select, a, b


```javascript
controller.buttons // check for specific button eg. controller.buttons['start'] is true of start is pressed 
```

**Example**
```javascript
    // make a NesSmartController object
    const simple_peer = new smartcontroller.NesSmartController('id'); 

    //Check if up button is pressed
    if (simple_peer.controllerList[Object.keys(controllerList)[0]].button['up']){
        // do something
    }
```


Try a demo here: link
Use the nes controller for your project: link
