//list of exported modules
import { SmartController } from "./SmartController";
import { JoystickSmartController } from "./JoystickSmartController";
import { TouchPadSmartController } from "./TouchPadSmartController";
import { NesSmartController } from "./NesSmartController";
import { SmartPhoneController } from "./SmartPhoneController";

export const smartcontroller = {
    SmartController,
    JoystickSmartController,
    TouchPadSmartController,
    NesSmartController, 
    SmartPhoneController
};

(<any>window).smartcontroller = smartcontroller;

