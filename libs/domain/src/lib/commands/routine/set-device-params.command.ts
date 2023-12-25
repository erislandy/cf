import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetDeviceParamsCommand implements IRoutineCommands {
    name: string;
    condition: "Above" | "Below" | "Between" | "ON" | "OFF";
    value: Array<number>;
    type:string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "set-device-params";
        this.condition = 'Above';
        this.type = '';
        this.description = 'set params of the device in routine changed';
        this.value = [];
        this.entityType = 'commands';
    }
    action(params : {name: string,condition: string, value: Array<number>, routine: RoutineEntity}) {
        return params.routine;
    }
}