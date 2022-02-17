---
layout: default
title: Getting Started
nav_order: 2
---

## Getting started

### Dependencies

SmartController uses <a href='https://peerjs.com/'> peerjs </a> to proide peer to peer connection between PC and smartphone browsers. The events are handled by <a href ='https://github.com/EventEmitter2/EventEmitter2'> EventEmmiter2 </a> and the qr codes are generated with <a href='https://github.com/ushelp/EasyQRCodeJS'> EasyQRCodeJS</a>

**Include the library**

install NPM package:
`npm install smartcontroller`

```js
// The usage -
import "smartcontroller";
```

html file:

    ```html
    <script src="https://unpkg.com/smartcontroller@3.2.1/dist/smartcontroller.min.js"> </script>
    ```

**Create a Peer**

```javascript
const peer = new smartcontroller.SmartController();
// if id is not specified a random one will be generated
```

**Create a QRcode** \
Make a qr code for easy phone connection. All you need is a url where the phone controller is hosted and a div element id.
Optionally specify a size and a player id and optional message throttle.

```javascript
peer.createQrCode(
  "https://emmapoliakova.github.io/webpack-test/joystick.html",
  "qrcode",
  150,
  150,
  "1",
  0
);
```

**Listen for events** \
Once the user connects with smartphone, you can listen for various events and use them to control the PC browser.

```javascript
// when a new conection is registered log the peer id, screen size and player id if specified
simplePeer.on("connection", function (peer) {
  console.log(peer);
});

// on incoming data log the input provided from smartphone
simplePeer.on("data", function (data) {
  console.log(data);
});
```
