# SmartController: Peer-to-peer for creating smartphone controllers

SmartController provides an easy way of turning a smartphone into versatile controller.

Paper now published on [arxiv](https://arxiv.org/abs/2208.02043)!

## How it works

### 1. Include SmartController

Simply make a new SmartController object on your website. The connection and data will be handled automatically.

### 2. Display the QRcode

Show a QRcode with the matching controller on your website for smarthphone to connect to. You can use one of the provided controllers or make your own!

### 3. Control the website

Use the incoming data from phone to interact with PC browser.

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
    <script src="https://unpkg.com/smartcontroller@2.0.0/dist/smartcontroller.min.js"> </script>
    ```

**Create a Peer**

```javascript
const peer = new smartcontroller.SmartController(123456789);
// if id is not specified a randm one will be generated
```

**Create a QRcode** \
Make a qr code for easy phone connection. All you need is a url where the phone controller is hosted and a div element id.
Optionally specify a size and a player id.

```javascript
peer.createQrCode(
  "https://emmapoliakova.github.io/webpack-test/joystick.html",
  "qrcode",
  150,
  150,
  "1"
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

Find the full <a href='https://smartcontrollerjs.github.io/SmartController/'> documentation </a> here.
