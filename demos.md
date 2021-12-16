---
layout: default
title: Demos 
nav_order: 6
---

Create a new controller

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

