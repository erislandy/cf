import { ICommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class ChangeStateCommand implements ICommands {
    name: string;
    entityType: 'commands';
    description: string;
    actionString: string;
    constructor() {
        this.name = "change-state";
        this.entityType = 'commands';
        this.description = 'isEnabled property in routine changed';
        this.actionString = `(isEnabled: boolean, routine: RoutineEntity) => {
            routine.name = name;
        }`;
    }
    action(isEnabled: boolean, routine: RoutineEntity) {
        routine.isEnabled = isEnabled;
        console.log(" change-state command executed: ", routine);
    }
}