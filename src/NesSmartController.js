import {SmartController} from './SmartController'; 

export class NesController{

  constructor(connection){
 
    this.peer = connection;  // the connection object from phone, this.peer.peer will give peer id
    this.buttons = {up:false, down:false, right:false, left:false, start:false, select:false, a:false, b:false}; //dictionary of buttons, true if pressed
    this.processData();  //listen to new data incoming and store them 
  }
 
  processData = () => {
   var selfN = this; //refers to the NesController object 
   this.peer.on("data", function(data){     // incoming data listener
    if (data.type=="user"){
      var controllerData = data.data
      var button = controllerData.button;
      
      if (controllerData.state=="start"){    //decide if button is active or not
      
        selfN.buttons[button] = true;
      }
  
      if (controllerData.state=="end"){
        selfN.buttons[button] = false;
      }
      
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
  
  //when a new connection is detected create a new NesController instance to store and process all the data
  controllerOptions = (conn) => {
      self.controllerList[conn.peer] = new NesController(conn);
    }

}