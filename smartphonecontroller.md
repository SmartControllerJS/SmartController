---
layout: default
title: Smart Phone Controller
nav_order: 6
---

## Create a new controller

SmartPhoneController is a class that facilitates the peer connection on the smartphone side. It handles almost everything automatically including the connection and all the parameters set in the URL. The only thing you need to do is create a desired format for your messages and then use the sendMessage function to send it to the computer browser.

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

## Making a new controller - demo

Let's make a simple accelerometer demo. Once it's ready, you can upload the file to your GitHub repository and test it with the <a href ='https://smartcontrollerjs.github.io/Controllers/stats.html'> statistics page </a>.

1. Start by creating an empty HTML file and including:

   ```js
   //Add this tag to your html file
   <head>
     <script src="https://unpkg.com/smartcontroller@3.2.4/dist/smartcontroller.min.js"></script>
   </head>
   ```

2. Next, in the body section add some divs to display the rotation of the device:

   ```js
   <body>
       <p id="z">Z axis</p>
       <div id="x">X axis</div>
       <div id="y">Y axis</div>
   ```

3. Create a SmartPhoneController object:

   ```js
   <script>
   var phone = new smartcontroller.SmartPhoneController();
   ```

4. Listen to the deviceorientation event, format and send the message:

   ```js
       var phone = new smartcontroller.SmartPhoneController();
       window.addEventListener("deviceorientation", function(event) {
           var message = {accelerometer:{"z":event.alpha, "x": event.beta, "y":event.gamma}};
           document.getElementById("z").innerHTML = event.alpha;
           document.getElementById("x").innerHTML = event.beta;
           document.getElementById("y").innerHTML = event.gamma;
           phone.sendMessage(message);
       }, true);

   </script>

   </body>

   ```

5. Finally, host the controller on the GitHub page and test it out!
