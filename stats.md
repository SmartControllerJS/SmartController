---
layout: default
title: Statistics
nav_order: 4
---

## Statistics

There is a range of statistic information available to help with monitoring performance. The stats feature is enabled by default. Each connected controller has its own set of stats.

**Ping** <br>
The ping is calculated as a roundtrip of stats type message. These are send constantly between the computer and the smartphone and are not influenceed by message throttle or the user type messages.

```javascript
var controller = simplePeer.controllerList[1]; // get a controller with player ID 1
controller.ping; //will return the current ping
```

**User message rate** <br>
A list of times of last user type messages received in the last second.

```javascript
controller.messageTimes; //will return list of Date variables
```

**Statistic message rate** <br>
A list of times of last stats type messages received in the last second.

```javascript
controller.messageTimesStats; //will return list of Date variables
```

There is a <a href ='https://smartcontrollerjs.github.io/Controllers/stats.html'> stats calculator </a> available to test with up to 4 users. You can input a url to your own controller or use one of the provided ones to run performance tests. Connect the controllers then press start to run the simulation. The plots will be created after the simulation is stopped and a csv file will be available to download.

<img src="media/statspage.png" width="1000" />
