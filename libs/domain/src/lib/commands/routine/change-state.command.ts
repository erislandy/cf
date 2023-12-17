import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class ChangeStateCommand implements IRoutineCommands {
    name: string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "change-state";
        this.entityType = 'commands';
        this.description = 'isEnabled property in routine changed';
    }
    action(params : {isEnabled: boolean, routine: RoutineEntity}) {
        params.routine.isEnabled = params.isEnabled;
        return params.routine;
    }
}