---
layout: default
title: Smart Phone Controller
nav_order: 5
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
peer.sendMessage(data);
//send any user input data
```
