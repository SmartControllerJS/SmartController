import {SmartController} from './SmartController'; 

export class NesController{

  constructor(connection){
 
    this.peer = connection;  // the connection object from phone, this.peer.peer will give peer id
    this.isActive = false; // signals of joysticks is moving
    this.button = null; //all information sent from joystick [angle, direction, distance, position coordinates]
    this.processData();  //listen to new data incoming and store them 
  }
 
  processData = () => {
   var selfN = this; //refers to the Joystick object -> temporary solution as using self = this in constructor was somehow overwriting self variable in SmartPeer class causing the dictionary and data emitting fail 

   this.peer.on("data", function(data){     // incoming data listener
    if (data.type=="user"){
      var controllerData = data.data
      if (controllerData.state=="start"){    //decide if joystick is active or not
        selfN.isActive = true;
      }
  
      if (controllerData.state=="end"){
        selfN.isActive = false;
      }
  
      selfN.button = controllerData.button;  //store the joystick object information sent by phone

      

    }
  });

  }
 
 }


export class NesSmartController extends SmartController{

  constructor(peerid) {
      super(peerid);
      self = this;
      this.controllerList = {}; //list of active players

      //listen for new connections
      this.peerConnection.on("connection", this.controllerOptions);
  }
  
  //when a new connection is detected create a new Joystick instance to store and process all the data
  controllerOptions = (conn) => {
      self.controllerList[conn.peer] = new NesController(conn);
    }

}