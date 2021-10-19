import {SmartController} from './SmartController'; 
import QRCode from 'qrcode'; // should be imported in SmartController.js only

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
   this.peer.on("data", function(data){  //for not the data has following form [0] = start/end of touch, [1] = number of fingers, [2] = coordinates for each finger
 
     selfT.state = data[2];
     selfT.finger_number = data[1];
 
     if (data[0]=="start"){
       selfT.isActive = true;
     }
 
     if (data[0]=="end"){
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


    //should be in SmartController only 
    createQrCode = (url = "touch screen canvas url", canvasID) => {
      self.peerConnection.on("open" , function(id){
        QRCode.toCanvas(document.getElementById(canvasID), url +"?id="+self.peerConnection.id, function (error) {
          if (error) console.error(error)
          console.log('success!');

      })
  })
}

}
