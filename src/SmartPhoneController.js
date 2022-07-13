import Peer from "peerjs";
import EventEmitter2 from "eventemitter2";

export class SmartPhoneController extends EventEmitter2 {
  constructor(peerid) {
    super();
    this.peerConnection = new Peer({
      secure: true,
      host: "smartcontrollerserver.herokuapp.com", // change here the herokuapp name
      port: 443,
    });
    self = this;
    this.lastPeerId = null;
    this.webid = null;
    this.playerid = null;
    this.connection = null;
    this.messageThrottle = 0;
    this.prevMessage = Date.now();
    this.idToSend = this.peerConnection.id;

    this.peerConnection.on("open", function (id) {
      //logs the browser peer id
      console.log("My peer ID is: " + id);
      self.idToSend = id;
      // Workaround for peer.reconnect deleting previous id
      if (self.peerConnection.id === null) {
        console.log("Received null id from peer open");
        self.peerConnection.id = self.lastPeerId;
      } else {
        self.lastPeerId = self.peerConnection.id;
      }

      self.getParameters(); //get webrid, player id, other parameters from url

      self.peerCreateConnection(); //connect to the webid

      self.emit("open", "ready");
    });

    self.peerConnection.on("connection", function (c) {
      // Disallow incoming connections
      c.on("open", function () {
        c.send("Sender does not accept incoming connections");
        setTimeout(function () {
          c.close();
        }, 500);
      });
    });

    self.peerConnection.on("disconnected", function () {
      console.log("Connection lost. Please reconnect");
      // Workaround for peer.reconnect deleting previous id
      self.peerConnection.id = lastPeerId;
      self.peerConnection._lastServerId = lastPeerId;
      self.peerConnection.reconnect();
    });

    self.peerConnection.on("close", function () {
      self.conn = null;
      console.log("Connection destroyed");
    });

    self.peerConnection.on("error", function (err) {
      console.log(err);
      alert("" + err);
    });
  }

  getParameters = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    self.webid = urlParams.get("id");
    self.playerid = urlParams.get("playerid");
    self.messageThrottle = parseInt(urlParams.get("throttle"));

    if (self.playerid != "null") {
      self.idToSend = self.playerid;
    }
  };

  peerCreateConnection = () => {
    //close old connection
    if (self.connection) {
      self.connection.close();
    }

    // Create connection to destination peer specified in the input field
    self.connection = self.peerConnection.connect(self.webid, {
      reliable: true,
    });

    self.connection.on("open", function () {
      console.log("Connected to: " + self.connection.peer);
      self.connection.send({
        type: "setup",
        data: {
          playerid: self.playerid,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        },
      });
    });
    // Handle incoming data (messages only since this is the signal sender)
    self.connection.on("data", function (data) {
      if (data.type == "disconnect") {
        console.log("cant connect now");
        self.connection.close();
        window.alert("Disconnected");
      }

      if (data.type == "stats") {
        self.connection.send({
          type: "stats",
          id: self.idToSend,
        });
      }
    });
    self.connection.on("close", function () {});
  };

  //send message to a peer with given ID
  sendMessage = (msg) => {
    if (Date.now() - self.prevMessage >= self.messageThrottle) {
      self.connection.send({ type: "user", data: msg, id: self.idToSend });
      self.prevMessage = Date.now();
    }
  };
}
