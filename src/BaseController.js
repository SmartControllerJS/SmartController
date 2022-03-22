export class BaseController {
  constructor(connection, playerID = null) {
    this.peer = connection; // the connection object from phone, this.peer.peer will give peer id
    this.playerID = playerID;
    var selfC = this;
    this.ping = 0;
    this.prevTime = Date.now();
    this.messageTimes = [Date.now()];
    this.messageTimesStats = [Date.now()];
    this.messagesPerSecond = 0;

    this.peer.on("data", function (data) {
      // incoming data listener

      if (data.type == "user") {
        selfC.updateController(data.data);
      }
    });
  }

  updateController = (data) => {
    console.log(data);
  };
}
