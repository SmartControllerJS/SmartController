import {SmartController} from './SmartController'; 

export class TouchPad{

  constructor(connection){
    
    this.peer = connection; // the connection object from phone, this.peer.peer will give peer id
    this.isActive = false;  // signals if touch is detected on the screen 
    this.state = [];  //coordinates for each finger, cant tell finger appart coordinates are recorded in order of tapping the screen
    this.finger_number = 0; //number of fingers touching the screen
    this.processData();
  }
 
  processData = () =>{
   var selfT = this; //refers to the Touchpad object -> temporary solution as using self = this in constructor was somehow overwriting self variable in SmartPeer class causing the dictionary and data emitting fail 
   this.peer.on("data", function(data){  //for now the data has following form data.state = start/end of touch, datat.fingers = number of fingers, data.coordinates = coordinates for each finger
 
     selfT.state = data.coordinates;
     selfT.finger_number = data.fingers;
 
     if (data.state=="start"){
       selfT.isActive = true;
     }
 
     if (data.state=="end"){
       selfT.isActive = false;
     }
 
   });
 }
 
 }

export class TouchPadSmartController extends SmartController{

  constructor(peerid) {
      super(peerid);
      self = this;
      this.touchpadList = {}; //list of active players

      //listen for new connections
      this.peerConnection.on("connection", this.touchpadOptions);
  }
  
  //when a new connection is detected create a new TouchPad instance to store and process all the data
  touchpadOptions = (conn) => {
      self.touchpadList[conn.peer] = new TouchPad(conn);
    }

}
