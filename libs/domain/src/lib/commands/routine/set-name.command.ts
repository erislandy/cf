import { ICommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNameCommand implements ICommands {
    name: string;
    entityType: 'commands';
    description: string;
    actionString: string;
    constructor() {
        this.name = "set-name";
        this.entityType = 'commands';
        this.description = 'Set name';
        this.actionString = `(name: string, routine: RoutineEntity) => {
            routine.name = name;
            console.log(" set-name command executed: ", routine);
        }`;
    }
    action(name: string, routine: RoutineEntity) {
        routine.name = name;
        console.log(" set-name command executed: ", routine);
    }
}