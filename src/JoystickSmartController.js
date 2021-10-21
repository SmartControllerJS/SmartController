import {SmartController} from './SmartController'; 

export class Joystick{

  constructor(connection){
 
    this.peer = connection;  // the connection object from phone, this.peer.peer will give peer id
    this.isActive = false; // signals of joysticks is moving
    this.state = []; //all information sent from joystick [angle, direction, distance, position coordinates]
    this.lastPosition = {x:0, y:0} //last position on pc screen 
    this.processData();  //listen to new data incoming and store them 
  }
 
  processData = () => {
   var selfJ = this; //refers to the Joystick object -> temporary solution as using self = this in constructor was somehow overwriting self variable in SmartPeer class causing the dictionary and data emitting fail 
   this.peer.on("data", function(data){     // incoming data listener
 
     if (data.state=="start"){    //decide if joystick is active or not
       selfJ.isActive = true;
     }
 
     if (data.state=="end"){
       selfJ.isActive = false;
     }
     
     selfJ.state = data.joystick;  //store the joystick object information sent by phone
   
     var xunits = Math.cos(selfJ.state.angle.degree*Math.PI/180) * 10;
     var yunits = Math.sin(selfJ.state.angle.degree*Math.PI/180) * 10;
 
     selfJ.lastPosition.x += xunits
     selfJ.lastPosition.y += yunits
       
 });
  }
 
 
 }


export class JoystickSmartController extends SmartController{

  constructor(peerid) {
      super(peerid);
      self = this;
      this.joystickList = {}; //list of active players

      //listen for new connections
      this.peerConnection.on("connection", this.joystickOptions);
  }
  
  //when a new connection is detected create a new Joystick instance to store and process all the data
  joystickOptions = (conn) => {
      self.joystickList[conn.peer] = new Joystick(conn);
    }

}