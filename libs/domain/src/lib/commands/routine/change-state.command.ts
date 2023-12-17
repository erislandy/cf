import { ICommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class ChangeStateCommand implements ICommands {
    name: string;
    entityType: 'commands';
    description: string;
    constructor() {
        this.name = "change-state";
        this.entityType = 'commands';
        this.description = 'isEnabled property in routine changed';
    }
    action(params : {isEnabled: boolean, routine: RoutineEntity}) {
        params.routine.isEnabled = params.isEnabled;
        console.log(" change-state command executed: ", params.routine);
    }
}