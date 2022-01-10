import {SmartController} from './SmartController'; 
import {BaseController} from './BaseController'; 

export class TouchPad extends BaseController{

  constructor(connection, playerID = null){
    
    super(connection, playerID);
    this.isActive = false;  // signals if touch is detected on the screen 
    this.state = [];  //coordinates for each finger, cant tell finger appart coordinates are recorded in order of tapping the screen
    this.finger_number = 0; //number of fingers touching the screen
  }
 
  updateController = (data) =>{
   var selfT = this; //refers to the Touchpad object

    selfT.state = data.coordinates;
    selfT.finger_number = data.fingers;

    if (data.state=="start"){
      selfT.isActive = true;
    }

    if (data.state=="end"){
      selfT.isActive = false;
    }

 }
 
 }

export class TouchPadSmartController extends SmartController{

  constructor(peerid, firstConnected = true) {
      super(peerid,firstConnected, TouchPad);
  }
  
}
