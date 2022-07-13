//list of exported modules
import { SmartController } from "./SmartController";
import { JoystickSmartController } from "./JoystickSmartController";
import { TouchPadSmartController } from "./TouchPadSmartController";
import { NesSmartController } from "./NesSmartController";
import { ScrollSmartController } from "./ScrollSmartController";
import { SmartPhoneController } from "./SmartPhoneController";

export const smartcontroller = {
    SmartController,
    JoystickSmartController,
    TouchPadSmartController,
    NesSmartController, 
    ScrollSmartController,
    SmartPhoneController

};

(<any>window).smartcontroller = smartcontroller;

