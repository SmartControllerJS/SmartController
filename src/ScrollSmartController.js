import { SmartController } from "./SmartController";
import { BaseController } from "./BaseController";

export class ScrollController extends BaseController {
  constructor(connection, playerID = null) {
    super(connection, playerID);
    this.direction = null;
    this.prevpos = 0;
    this.isActive = false;
  }

  updateController = (data) => {
    var selfT = this;

    if (data.state == "start") {
      selfT.isActive = true;
    }

    if (data.state == "end") {
      selfT.isActive = false;
    }

    if (data.coordinates[0][1] > this.prevpos) {
      this.direction = false;
    } else {
      this.direction = true;
    }

    this.prevpos = data.coordinates[0][1];
  };
}

export class ScrollSmartController extends SmartController {
  constructor(peerid = null, firstConnected = true, stats = true) {
    super(peerid, firstConnected, stats, ScrollController);
  }
}
