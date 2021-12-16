import {SmartController} from './SmartController'; 
import {BaseController} from './BaseController'; 

export class NesController extends BaseController{

  constructor(connection){
    super(connection);
    this.buttons = {up:false, down:false, right:false, left:false, start:false, select:false, a:false, b:false}; //dictionary of buttons, true if pressed
  }
 
  updateController = (data) => {
   var selfN = this; //refers to the NesController object 
      
    var controllerData = data
    var button = controllerData.button;
    
    if (controllerData.state=="start"){    //decide if button is active or not
    
      selfN.buttons[button] = true;
    }

    if (controllerData.state=="end"){
      selfN.buttons[button] = false;
    }
      
    

  }
 
 }


export class NesSmartController extends SmartController{

  constructor(peerid) {
      super(peerid, NesController);
  }

}