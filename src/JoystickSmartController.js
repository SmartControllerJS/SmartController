import {SmartController} from './SmartController'; 
import {BaseController} from './BaseController'; 

class Joystick extends BaseController{

  constructor(connection, playerID = null){
    super(connection, playerID);
    this.state = []; //all information sent from joystick [angle, direction, distance, position coordinates]
    this.positionChange = {x:0, y:0} //shows by how much the position changed 
    this.isActive = false;
  }
 
  updateController = (data) => {
    var selfJ = this; //refers to the Joystick object
    
   
    var joystickData = data
    if (joystickData.state=="start"){    //decide if joystick is active or not
        selfJ.isActive = true;
      }
  
    if (joystickData.state=="end"){
        selfJ.isActive = false;
      }
      
    selfJ.state = joystickData.joystick;  //store the joystick object information sent by phone

     
    selfJ.positionChange.x = Math.cos(selfJ.state.angle.degree*Math.PI/180) * 10;
    selfJ.positionChange.y = Math.sin(selfJ.state.angle.degree*Math.PI/180) * 10;
      

    }
 

  }
 

export class JoystickSmartController extends SmartController{

  constructor(peerid, firstConnected = true) {
      super(peerid, firstConnected, Joystick);
  }
  
}